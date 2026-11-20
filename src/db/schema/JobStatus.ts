// web/src/db/schema/JobStatus.ts

import { lookupColumns } from '@src/db/lookupColumns'
import { text, sqliteTable } from 'drizzle-orm/sqlite-core'


/** Job status lookup table */
export const JobStatus = sqliteTable('JobStatus', {
  ...lookupColumns(),
  description: text('description').notNull(),
})
