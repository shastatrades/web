// web/src/enums/staffEndReasons.enum.ts

import { Enum } from '@enum'

export const enumStaffEndReasons = new Enum([
  { id: 1, value: 'Resigned', slug: 'resigned' },
  { id: 2, value: 'Quit', slug: 'quit' },
  { id: 3, value: 'Laid Off', slug: 'laidOff' },
  { id: 4, value: 'Fired', slug: 'fired' },
  { id: 5, value: 'Role Change', slug: 'roleChange' },
], 'slug')
