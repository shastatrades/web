// web/src/enums/objectiveActivityTypes.enum.ts

import { Enum } from '@enum'


export const enumObjectiveActivityTypes = new Enum([
  { id: 1, value: 'Assignee Added', slug: 'assigneeAdded' },
  { id: 2, value: 'Assignee Removed', slug: 'assigneeRemoved' },
  { id: 3, value: 'Column Changed', slug: 'columnChanged' },
  { id: 4, value: 'Tag Added', slug: 'tagAdded' },
  { id: 5, value: 'Tag Removed', slug: 'tagRemoved' },
  { id: 6, value: 'Comment Added', slug: 'commentAdded' },
  { id: 7, value: 'Objective Created', slug: 'objectiveCreated' },
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
