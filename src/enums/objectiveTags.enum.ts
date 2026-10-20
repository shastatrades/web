// web/src/enums/objectiveTags.enum.ts

import { Enum } from '@enum'

export const enumObjectiveTags = new Enum([
  { id: 1, label: 'In Development', slug: 'inDevelopment' },
  { id: 2, label: 'Ready for QA', slug: 'readyForQa' },
  { id: 3, label: 'In QA', slug: 'inQa' },
  { id: 4, label: 'Failed QA', slug: 'failedQa' },
  { id: 5, label: 'Passed QA', slug: 'passedQa' },
  { id: 6, label: 'Completed', slug: 'completed' },
  { id: 7, label: 'Archived', slug: 'archived' },
], 'slug')
