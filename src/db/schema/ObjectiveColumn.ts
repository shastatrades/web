// web/src/db/schema/ObjectiveColumn.ts

import { sqliteTable } from 'drizzle-orm/sqlite-core'
import { lookupColumns } from '@src/db/lookupColumns'


/** Objective column (on Kanban) lookup table */
export const ObjectiveColumn = sqliteTable('ObjectiveColumn', lookupColumns())
