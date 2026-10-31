// web/src/db/queryObjectiveActivity.ts

import { alias } from 'drizzle-orm/sqlite-core'
import { eq, and, or, lt, desc, inArray, isNotNull } from 'drizzle-orm'
import { objectiveActivityTypesByVariant } from '@src/enums/objectiveActivityTypes.enum'
import { prop, epoch, leftJoin, createParentShape, type InferQuery } from '@drizzle-compose'
import { db, Person, Objective, ObjectiveColumn, ObjectiveComment, ObjectiveTag, ObjectiveActivity, ObjectiveActivityType, Objective__Assignee, ObjectiveComment__Assignee } from '@src/db'



// vite blows up if alias proxy's are not w/in a function
const ActorAlias = () => alias(Person, 'Actor')
const AssigneeAlias = () => alias(Person, 'Assignee')
const ToColumnAlias = () => alias(ObjectiveColumn, 'ToColumn')
const FromColumnAlias = () => alias(ObjectiveColumn, 'FromColumn')
const ObjectiveAssigneeAlias = () => alias(Objective__Assignee, 'ObjectiveAssignee')
const CommentAssigneeAlias = () => alias(ObjectiveComment__Assignee, 'CommentAssignee')


/**
 * @example
  ```ts
  const page1 = await queryObjectiveActivity({ variant: 'all' })

  if (page1.nextCursor) {
    const page2 = await queryObjectiveActivity({
      variant: 'all',
      cursor: page1.nextCursor,
    })
  }
  ```
 */
export async function queryObjectiveActivity(props: QueryObjectiveActivityProps) {
  if (props.variant === 'personal' && props.sessionPersonId === undefined) {
    throw new Error('queryObjectiveActivity: `sessionPersonId` is required when `variant` is "personal"')
  }
  
  const limit = props.limit ?? 10
  const rows = await getBaseQuery({ ...props, limit: limit + 1, cursor: props.cursor }) // fetch one extra row to detect whether another page exists without a separate COUNT(*) query — this is the standard keyset hasMore trick

  const items = leftJoin(rows, {
    parent: { shape: parentShape },
  })

  const hasMore = items.length > limit
  if (hasMore) items.length = limit // drop the sentinel row

  const last = items.at(-1)

  return {
    items,
    nextCursor: hasMore && last // `null` = no more pages
      ? { createdAt: last.createdAt, id: last.id }
      : null,
  }
}



function getBaseQuery(props: QueryObjectiveActivityProps & { limit: number }) {
  const Actor = ActorAlias()
  const Assignee = AssigneeAlias()
  const FromColumn = FromColumnAlias()
  const ToColumn = ToColumnAlias()
  const ObjectiveAssignee = ObjectiveAssigneeAlias()
  const CommentAssignee = CommentAssigneeAlias()

  let q = db // columns + joins shared by both variants
    .select({
      id: ObjectiveActivity.id,
      typeId: ObjectiveActivityType.id,
      typeValue: ObjectiveActivityType.value,
      createdAt: ObjectiveActivity.createdAt,

      objectiveId: Objective.id,
      objectiveTitle: Objective.title,
      objectiveBoardId: Objective.boardId,

      actorId: Actor.id,
      actorImageId: Actor.imageId,
      actorFirstName: Actor.firstName,
      actorLastName: Actor.lastName,

      assigneeId: Assignee.id,
      assigneeImageId: Assignee.imageId,
      assigneeFirstName: Assignee.firstName,
      assigneeLastName: Assignee.lastName,

      fromColumnId: FromColumn.id,
      fromColumnValue: FromColumn.value,

      toColumnId: ToColumn.id,
      toColumnValue: ToColumn.value,

      tagId: ObjectiveTag.id,
      tagValue: ObjectiveTag.value,
      tagBgHex: ObjectiveTag.bgHex,
      tagFgHex: ObjectiveTag.fgHex,

      commentId: ObjectiveComment.id,
      commentValue: ObjectiveComment.value,
    })
    .from(ObjectiveActivity)
    .innerJoin(ObjectiveActivityType, eq(ObjectiveActivityType.id, ObjectiveActivity.typeId))
    .innerJoin(Objective, eq(Objective.id, ObjectiveActivity.objectiveId))

  if (props.variant === 'personal') { // personal-only joins (used purely for filtering)
    q = q
      .leftJoin(
        ObjectiveAssignee,
        and(
          eq(ObjectiveAssignee.objectiveId, ObjectiveActivity.objectiveId),
          eq(ObjectiveAssignee.personId, props.sessionPersonId),
        ),
      )
      .leftJoin(
        CommentAssignee,
        and(
          eq(CommentAssignee.commentId, ObjectiveActivity.commentId),
          eq(CommentAssignee.personId, props.sessionPersonId),
        ),
      )
  }

  const variantWhere = props.variant === 'all'
    ? and(
      eq(Objective.boardId, props.boardId),
      inArray(ObjectiveActivity.typeId, objectiveActivityTypesByVariant.all),
    )
    : and(
      inArray(ObjectiveActivity.typeId, objectiveActivityTypesByVariant.personal),
      or(
        isNotNull(ObjectiveAssignee.id), // path A: objective the person is assigned to
        isNotNull(CommentAssignee.id),   // path B: comment directly assigned to the person
      ),
    )

  const cursorWhere = props.cursor // Keyset cursor: strictly "older than" the last seen row, using id as tiebreaker. (createdAt, id) is a total order because id is a unique autoincrement.
    ? or(
      lt(ObjectiveActivity.createdAt, new Date(props.cursor.createdAt)),
      and(
        eq(ObjectiveActivity.createdAt, new Date(props.cursor.createdAt)),
        lt(ObjectiveActivity.id, props.cursor.id),
      ),
    )
    : undefined

  return q
    .leftJoin(Actor, eq(Actor.id, ObjectiveActivity.actorId))
    .leftJoin(Assignee, eq(Assignee.id, ObjectiveActivity.assigneeId))
    .leftJoin(FromColumn, eq(FromColumn.id, ObjectiveActivity.fromColumnId))
    .leftJoin(ToColumn, eq(ToColumn.id, ObjectiveActivity.toColumnId))
    .leftJoin(ObjectiveTag, eq(ObjectiveTag.id, ObjectiveActivity.tagId))
    .leftJoin(ObjectiveComment, eq(ObjectiveComment.id, ObjectiveActivity.commentId))
    .where(cursorWhere ? and(variantWhere, cursorWhere) : variantWhere)
    .orderBy(desc(ObjectiveActivity.createdAt), desc(ObjectiveActivity.id))
    .limit(props.limit)
}



const parentShape = createParentShape(getBaseQuery).fn(row => ({
  id: row.id,
  typeId: row.typeId,
  type: row.typeValue,
  createdAt: epoch(row.createdAt),

  objective: {
    id: row.objectiveId,
    title: row.objectiveTitle,
    boardId: row.objectiveBoardId,
  },

  actor: row.actorId === null ? null : {
    id: row.actorId,
    imageId: prop(row.actorImageId, Person.imageId),
    firstName: prop(row.actorFirstName, Person.firstName),
    lastName: prop(row.actorLastName, Person.lastName),
  },

  assignee: row.assigneeId === null ? null : {
    id: row.assigneeId,
    imageId: prop(row.assigneeImageId, Person.imageId),
    firstName: prop(row.assigneeFirstName, Person.firstName),
    lastName: prop(row.assigneeLastName, Person.lastName),
  },

  fromColumn: row.fromColumnId === null ? null : {
    id: row.fromColumnId,
    value: prop(row.fromColumnValue, ObjectiveColumn.value),
  },

  toColumn: row.toColumnId === null ? null : {
    id: row.toColumnId,
    value: prop(row.toColumnValue, ObjectiveColumn.value),
  },

  tag: row.tagId === null ? null : {
    id: row.tagId,
    value: prop(row.tagValue, ObjectiveTag.value),
    bgHex: prop(row.tagBgHex, ObjectiveTag.bgHex),
    fgHex: prop(row.tagFgHex, ObjectiveTag.fgHex),
  },

  comment: row.commentId === null ? null : {
    id: row.commentId,
    value: prop(row.commentValue, ObjectiveComment.value),
  },
}))



export type QueryObjectiveActivity = InferQuery<typeof queryObjectiveActivity>

export type QueryObjectiveActivityItem = QueryObjectiveActivity['items'][number]

export type QueryObjectiveActivityProps = 
  | {
    variant: 'all'
    boardId: number 
    limit?: number
    /** Pass `nextCursor` from the previous page. Omit for the first page. */
    cursor?: ObjectiveActivityCursor
  }
  | {
    variant: 'personal'
    sessionPersonId: number
    limit?: number
    /** Pass `nextCursor` from the previous page. Omit for the first page. */
    cursor?: ObjectiveActivityCursor
  }

export type ObjectiveActivityCursor = {
  /** ms since epoch — `createdAtMs` on the previous page's last item */
  createdAt: number
  /** `id` on the previous page's last item */
  id: number
}
