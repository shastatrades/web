// web/src/db/schema/StaffPosition.ts

import { lookupColumns } from '@src/db/lookupColumns'
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'


/** Staff position lookup table */
export const StaffPosition = sqliteTable('StaffPosition', {
  ...lookupColumns(),
  isHiring: integer('isHiring', { mode: 'boolean' }).notNull().default(true),
})
