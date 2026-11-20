// web/src/db/seed.ts

import { seed } from '@sqlite-seed'
import { enumTrades } from '@src/enums/trades.enum'
import { enumJobStatuses } from '@src/enums/jobStatuses.enum'
import { enumLeadStatuses } from '@src/enums/leadStatuses.enum'
import { enumObjectiveTags } from '@src/enums/objectiveTags.enum'
import { enumStaffPositions } from '@src/enums/staffPositions.enum'
import { enumStaffEndReasons } from '@src/enums/staffEndReasons.enum'
import { enumObjectiveBoards } from '@src/enums/objectiveBoards.enum'
import { enumObjectiveColumns } from '@src/enums/objectiveColumns.enum'
import { enumObjectiveActivityTypes } from '@src/enums/objectiveActivityTypes.enum'
import { db, Trade, JobStatus, LeadStatus, StaffPosition, StaffEndReason, ObjectiveColumn, ObjectiveTag, ObjectiveActivityType, ObjectiveBoard } from '@src/db'


await seed(db, [
  { table: Trade, values: enumTrades.array },
  { table: JobStatus, values: enumJobStatuses.array },
  { table: LeadStatus, values: enumLeadStatuses.array },
  { table: ObjectiveTag, values: enumObjectiveTags.array },
  { table: StaffPosition, values: enumStaffPositions.array },
  { table: StaffEndReason, values: enumStaffEndReasons.array },
  { table: ObjectiveBoard, values: enumObjectiveBoards.array },
  { table: ObjectiveColumn, values: enumObjectiveColumns.array },
  { table: ObjectiveActivityType, values: enumObjectiveActivityTypes.array },
])

console.log('✅ Database seed complete!')

process.exit(0)
