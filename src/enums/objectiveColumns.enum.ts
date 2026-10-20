// web/src/enums/objectiveColumns.enum.ts

import { Enum } from '@enum'

export const enumObjectiveColumns = new Enum([
  { id: 1, label: 'To Do', isActive: true, slug: 'todo' },
  { id: 2, label: 'In Progress', isActive: true, slug: 'inProgress' },
  { id: 3, label: 'Completed', isActive: true, slug: 'completed' }
], 'slug')
