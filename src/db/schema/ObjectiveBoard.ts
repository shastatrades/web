// web/src/db/schema/ObjectiveBoard.ts

import { sql } from 'drizzle-orm'
import { lookupColumns } from '@src/db/lookupColumns'
import { integer, uniqueIndex, sqliteTable } from 'drizzle-orm/sqlite-core'


/** Objective board (e.g. "Q3 2026", "Q4 2026") lookup table */
export const ObjectiveBoard = sqliteTable(
  'ObjectiveBoard',
  {
    ...lookupColumns(),
    isCurrent: integer('isCurrent', { mode: 'boolean' }).notNull().default(false),
  },
  (table) => [
    uniqueIndex('ObjectiveBoard__isCurrent__unique')
      .on(table.isCurrent)
      .where(sql`${table.isCurrent} = 1`),
  ]
)
