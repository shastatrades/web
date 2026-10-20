// web/src/enums/objectiveActivityTypes.enum.ts

import { Enum } from '@enum'


export const enumObjectiveActivityTypes = new Enum([
  { id: 1, label: 'Assignee Added', slug: 'assigneeAdded' },
  { id: 2, label: 'Assignee Removed', slug: 'assigneeRemoved' },
  { id: 3, label: 'Column Changed', slug: 'columnChanged' },
  { id: 4, label: 'Tag Added', slug: 'tagAdded' },
  { id: 5, label: 'Tag Removed', slug: 'tagRemoved' },
  { id: 6, label: 'Comment Added', slug: 'commentAdded' },
  { id: 7, label: 'Objective Created', slug: 'objectiveCreated' },
], 'slug')


export const objectiveActivityTypesByVariant = {
  all: [
    enumObjectiveActivityTypes.slug.columnChanged.id,
    enumObjectiveActivityTypes.slug.tagAdded.id,
    enumObjectiveActivityTypes.slug.tagRemoved.id,
    enumObjectiveActivityTypes.slug.commentAdded.id,
    enumObjectiveActivityTypes.slug.objectiveCreated.id,
  ],
  personal: [
    enumObjectiveActivityTypes.slug.assigneeAdded.id,
    enumObjectiveActivityTypes.slug.assigneeRemoved.id,
    enumObjectiveActivityTypes.slug.columnChanged.id,
    enumObjectiveActivityTypes.slug.tagAdded.id,
    enumObjectiveActivityTypes.slug.tagRemoved.id,
    enumObjectiveActivityTypes.slug.commentAdded.id,
  ],
}
