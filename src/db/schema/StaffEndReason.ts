// web/src/db/schema/StaffEndReason.ts

import { sqliteTable } from 'drizzle-orm/sqlite-core'
import { lookupColumns } from '@src/db/lookupColumns'


/** Staff end reason lookup table */
export const StaffEndReason = sqliteTable('StaffEndReason', lookupColumns())
