// web/src/enums/funds.enum.ts

import { Enum } from '@enum'

export const enumFunds = new Enum([
  { id: 1, label: 'General Operating', slug: 'generalOperating' },
  { id: 2, label: 'Operating Reserve', slug: 'operatingReserve' },
  { id: 3, label: 'Capital & Equipment', slug: 'capitalAndEquipment' },
  { id: 4, label: 'Workforce Development', slug: 'workforceDevelopment' },
  { id: 5, label: 'Opportunity Youth', slug: 'opportunityYouth' },
  { id: 6, label: 'Apprenticeship Training', slug: 'apprenticeshipTraining' },
  { id: 7, label: 'Mentor Development', slug: 'mentorDevelopment' },
  { id: 8, label: 'Low & Moderate Income', slug: 'lowAndModerateIncome' },
  { id: 9, label: 'Elderly Assistance', slug: 'elderlyAssistance' },
  { id: 10, label: 'Community Repair', slug: 'communityRepair' },
  { id: 11, label: 'Wildfire Repair', slug: 'wildfireRepair' },
], 'slug')
