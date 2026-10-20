// web/src/db/schema/LeadStatus.ts

import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'


/** Lead status lookup table */
export const LeadStatus = sqliteTable('LeadStatus', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  value: text('value').notNull(),
  isActive: integer('isActive', { mode: 'boolean' }).notNull().default(true),
})
