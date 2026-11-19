// web/npm/sqlite-seed/index.ts

import { safeArrayAccess } from '@safely-access'
import { sql, type InferInsertModel, type Table } from 'drizzle-orm'


/** Shape of a single seed entry: a drizzle table and its prospective rows. */
type SeedEntry = {
  table: Table
  values: readonly unknown[]
}

/**
 * Per-entry validation: `values` must match `InferInsertModel<table>` — the
 * same structural check drizzle's `.values()` applies.
 */
type ValidatedEntry<TEntry extends SeedEntry> =
  TEntry extends { table: infer TTable extends Table }
  ? { table: TTable; values: readonly InferInsertModel<TTable>[] }
  : never

/** Map each entry to its validated form. */
type ValidatedEntries<TEntries extends readonly SeedEntry[]> = {
  readonly [K in keyof TEntries]: ValidatedEntry<TEntries[K]>
}

/** Minimum drizzle db shape (async driver) needed to run a transaction. */
type SeedDB = {
  transaction: <T>(fn: (tx: any) => Promise<T>) => Promise<T>
}

/**
 * Clear-then-insert seeding for drizzle sqlite tables, in one transaction.
 *
 * Clears run **in reverse order** (children → parents) so FKs release; inserts
 * run **in forward order** (parents → children). Order entries like your FK
 * graph — parents first.
 *
 * `values` is checked against `InferInsertModel<table>`, giving the same type
 * safety as calling `db.insert(table).values(...)` directly.
 *
 * Requires an **async** driver (e.g. `@libsql/client`). For `better-sqlite3`
 * (sync transactions), call `db.transaction(syncFn)` yourself instead.
 *
 * @example
 * ```ts
 * await seed(db, [
 *   { table: ObjectiveBoard,  values: enumObjectiveBoards.array },
 *   { table: ObjectiveColumn, values: enumObjectiveColumns.array },
 * ])
 * ```
 */
export async function seed<const TEntries extends readonly SeedEntry[]>(
  db: SeedDB,
  entries: TEntries & ValidatedEntries<TEntries>,
): Promise<void> {
  await db.transaction(async (tx) => {
    // Defer FK enforcement to COMMIT. Required because clearing a parent
    // whose children still exist (or that we re-seed with the same ids)
    // would otherwise trip SQLITE_CONSTRAINT on the DELETE. SQLite resets
    // this pragma automatically at COMMIT/ROLLBACK.
    await tx.run(sql`PRAGMA defer_foreign_keys = ON`)

    // Clear in reverse: child FKs release before parent deletes.
    for (let i = entries.length - 1; i >= 0; i--) {
      await tx.delete(safeArrayAccess(entries, i).table)
    }

    // Insert in forward: parents before children.
    for (const entry of entries) {
      if (entry.values.length === 0) continue
      await tx.insert(entry.table).values([...entry.values])
    }
  })
}
