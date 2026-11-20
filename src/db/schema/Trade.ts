// web/src/db/schema/Trade.ts

import { sqliteTable } from 'drizzle-orm/sqlite-core'
import { lookupColumns } from '@src/db/lookupColumns'


/** Trades lookup table */
export const Trade = sqliteTable('Trade', lookupColumns())
