// web/src/db/schema/ObjectiveBoard.ts

import { sql } from 'drizzle-orm'
import { text, integer, uniqueIndex, sqliteTable } from 'drizzle-orm/sqlite-core'


/** Objective board (e.g. "Q3 2026", "Q4 2026") lookup table */
export const ObjectiveBoard = sqliteTable(
  'ObjectiveBoard',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    value: text('value').notNull(),
    slug: text('slug').notNull(),
    isActive: integer('isActive', { mode: 'boolean' }).notNull().default(true),
    isCurrent: integer('isCurrent', { mode: 'boolean' }).notNull().default(false),
  },
  (table) => [
    uniqueIndex('ObjectiveBoard__slug__unique').on(table.slug),
    uniqueIndex('ObjectiveBoard__isCurrent__unique')
      .on(table.isCurrent)
      .where(sql`${table.isCurrent} = 1`),
  ]
)
