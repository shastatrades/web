// web/src/enums/objectiveColumns.enum.ts

import { Enum } from '@enum'

export const enumObjectiveColumns = new Enum([
  { id: 1, value: 'To Do', isActive: true, slug: 'todo' },
  { id: 2, value: 'In Progress', isActive: true, slug: 'inProgress' },
  { id: 3, value: 'Completed', isActive: true, slug: 'completed' }
], 'slug')
