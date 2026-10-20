// web/src/enums/grantFit.enum.ts

import { Enum } from '@enum'

export const enumGrantFit = new Enum([
  { id: 1, label: 'Excellent: Strong mission, eligibility & timing fit', slug: 'excellent' },
  { id: 2, label: 'Strong: Good fit, minor gaps', slug: 'strong' },
  { id: 3, label: 'Moderate: Partial fit, needs review', slug: 'moderate' },
  { id: 4, label: 'Weak: Poor fit, includes big blockers', slug: 'weak' },
], 'slug')
