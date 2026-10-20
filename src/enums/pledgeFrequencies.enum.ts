// web/src/enums/pledgeFrequency.enum.ts

import { Enum } from '@enum'

export const enumPledgeFrequencies = new Enum([
  { id: 1, label: 'Single payment', slug: 'oneTime' },
  { id: 2, label: 'Weekly', slug: 'weekly' },
  { id: 3, label: 'Monthly', slug: 'monthly' },
  { id: 4, label: 'Quarterly', slug: 'quarterly' },
  { id: 5, label: 'Annually', slug: 'annually' },
  { id: 6, label: 'Triggered by milestone', slug: 'milestone' },
], 'slug')
