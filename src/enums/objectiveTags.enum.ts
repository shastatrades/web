// web/src/enums/objectiveTags.enum.ts

import { Enum } from '@enum'

export const enumObjectiveTags = new Enum([
  { id: 1, value: 'In Development', slug: 'inDevelopment', order: 1, bgHex: '#DBEAFE', fgHex: '#1E40AF' },
  { id: 2, value: 'Ready for QA', slug: 'readyForQa', order: 2, bgHex: '#E1DBFE', fgHex: '#5027FF' },
  { id: 3, value: 'In QA', slug: 'inQa', order: 3, bgHex: '#FEF3C7', fgHex: '#92400E' },
  { id: 4, value: 'Failed QA', slug: 'failedQa', order: 4, bgHex: '#FEE2E2', fgHex: '#991B1B' },
  { id: 5, value: 'Passed QA', slug: 'passedQa', order: 5, bgHex: '#F3F9F5', fgHex: '#018A5D' },
  { id: 6, value: 'Completed', slug: 'completed', order: 6, bgHex: '#DCFCE7', fgHex: '#166534' },
  { id: 7, value: 'Archived', slug: 'archived', order: 7, bgHex: '#F1F5F9', fgHex: '#475569' },
], 'slug')
