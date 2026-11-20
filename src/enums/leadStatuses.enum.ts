// web/src/enums/leadStatuses.enum.ts

import { Enum } from '@enum'

export const enumLeadStatuses = new Enum([
  { id: 1, value: 'New', slug: 'new' },
  { id: 2, value: 'Contacted', slug: 'contacted' },
  { id: 3, value: 'Won', slug: 'won' },
  { id: 4, value: 'Lost', slug: 'lost' },
  { id: 5, value: 'Closed', slug: 'closed' },
], 'slug')
