// web/src/db/schema/ObjectiveActivityType.ts

import { sqliteTable } from 'drizzle-orm/sqlite-core'
import { lookupColumns } from '@src/db/lookupColumns'

/** Objective activity types lookup table */
export const ObjectiveActivityType = sqliteTable('ObjectiveActivityType', lookupColumns())
