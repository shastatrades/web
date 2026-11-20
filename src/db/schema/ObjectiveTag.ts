// web/src/db/schema/ObjectiveTag.ts

import { lookupColumns } from '@src/db/lookupColumns'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'


/** Objective tag lookup table (more specific than **ObjectiveColumn**) */
export const ObjectiveTag = sqliteTable('ObjectiveTag', {
  ...lookupColumns(),
  order: integer('order').notNull(),
  bgHex: text('bgHex').notNull(),
  fgHex: text('fgHex').notNull(),
})
