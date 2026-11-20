// web/src/db/schema/LeadStatus.ts

import { sqliteTable } from 'drizzle-orm/sqlite-core'
import { lookupColumns } from '@src/db/lookupColumns'


/** Lead status lookup table */
export const LeadStatus = sqliteTable('LeadStatus', lookupColumns())
