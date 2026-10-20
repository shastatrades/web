// web/src/enums/donorTypes.enum.ts

import { Enum } from '@enum'

export const enumDonorTypes = new Enum([
  { id: 1, label: 'Individual', slug: 'individual' },
  { id: 2, label: 'Staff', slug: 'staff' },
  { id: 3, label: 'Board Member', slug: 'board-member' },
  { id: 4, label: 'Corporation', slug: 'corporation' },
  { id: 5, label: 'Nonprofit', slug: 'nonprofit' },
  { id: 6, label: 'Foundation', slug: 'foundation' },
  { id: 7, label: 'Government', slug: 'government' },
], 'slug')
