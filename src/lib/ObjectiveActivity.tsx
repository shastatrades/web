// web/src/lib/ObjectiveActivity.tsx

import { css } from 'hono/css'
import type { FC } from 'hono/jsx'
import { AppType } from '@src/index'
import { createRPC, InferRpc } from '@hono-api/be'
import { formatTime } from '@hono-directives'
import svgPersonAdd from '@src/svg/personAdd.html?raw'
import svgAddComment from '@src/svg/addComment.html?raw'
import svgAddDocument from '@src/svg/addDocument.html?raw'
import svgpPersonRemove from '@src/svg/personRemove.html?raw'
import { enumObjectiveTags } from '@src/enums/objectiveTags.enum'
import { enumObjectiveColumns } from '@src/enums/objectiveColumns.enum'
import type { QueryObjectiveActivity, QueryObjectiveActivityItem } from '@src/db'
import { enumObjectiveBoards } from '@src/enums/objectiveBoards.enum'


export const ObjectiveActivity = (({ res }) => {
  const rpc = createRPC<AppType>()

  return <>
    <div class="feed">
      {res.items.map(item => <ObjectiveActivityItem item={item} rpc={rpc} />)}
    </div>

    {
      res.nextCursor && <>
        <div class="feed-footer">
          <hr />
          <button type="button" class="primary">Load older activity</button>
        </div>
      </>
    }
  </>
}) satisfies FC<{ res: QueryObjectiveActivity }>



export const ObjectiveActivityItem = (({ item, rpc }) => {
  const objectiveBoard = enumObjectiveBoards.get(item.objective.boardId)
  if (!objectiveBoard) throw new Error('!objectiveBoard')

  switch (item.typeId) {
    case 1: return <AssigneeAdded rpc={rpc} objective={item.objective} objectiveBoardSlug={objectiveBoard.slug} actorName={item.actor?.firstName + ' ' + item.actor?.lastName} assigneeName={item.assignee?.firstName + ' ' + item.assignee?.lastName} epoch={item.createdAt} />
    case 2: return <AssigneeRemoved rpc={rpc} objective={item.objective} objectiveBoardSlug={objectiveBoard.slug} actorName={item.actor?.firstName + ' ' + item.actor?.lastName} assigneeName={item.assignee?.firstName + ' ' + item.assignee?.lastName} epoch={item.createdAt} />
    case 4:
      if (!item.tag?.id) throw new Error('!item.tag?.id', { cause: item })
      return <TagAdded rpc={rpc} objective={item.objective} objectiveBoardSlug={objectiveBoard.slug} actorName={item.actor?.firstName + ' ' + item.actor?.lastName} tagId={item.tag.id} epoch={item.createdAt} />
    case 5:
      if (!item.tag?.id) throw new Error('!item.tag?.id', { cause: item })
      return <TagRemoved rpc={rpc} objective={item.objective} objectiveBoardSlug={objectiveBoard.slug} actorName={item.actor?.firstName + ' ' + item.actor?.lastName} tagId={item.tag.id} epoch={item.createdAt} />
    case 6:
      if (!item.comment) throw new Error('!item.comment', { cause: item })
      return <CommentAdded rpc={rpc} objective={item.objective} objectiveBoardSlug={objectiveBoard.slug} actorName={item.actor?.firstName + ' ' + item.actor?.lastName} comment={item.comment.value} epoch={item.createdAt} />
    case 7:
      if (!item.toColumn?.id) throw new Error('!item.toColumn?.id', { cause: item })
      return <ObjectiveCreated rpc={rpc} objective={item.objective} objectiveBoardSlug={objectiveBoard.slug} actorName={item.actor?.firstName + ' ' + item.actor?.lastName} columnId={item.toColumn.id} epoch={item.createdAt} />
    case 3:
      if (!item.toColumn?.id) throw new Error('!item.toColumn?.id', { cause: item })
      if (!item.fromColumn?.id) throw new Error('!item.fromColumn?.id', { cause: item })
      return <ColumnChanged rpc={rpc} objective={item.objective} objectiveBoardSlug={objectiveBoard.slug} actorName={item.actor?.firstName + ' ' + item.actor?.lastName} fromColumnId={item.fromColumn.id} toColumnId={item.toColumn.id} epoch={item.createdAt} />
    default: return <></>
  }
}) satisfies FC<{ item: QueryObjectiveActivityItem, rpc: InferRpc<AppType> }>



export const objectiveActivityStyle = css`
  .feed {
    margin: 0 auto;
    max-width: 75rem;
    position: relative;
    padding-top: var(--space-lite);
    &::before {
      content: '';
      position: absolute;
      left: 1.9rem;
      top: 1.2rem;
      bottom: 1.2rem;
      width: 0.1rem;
      background: #ececec;
    }

    .event {
      position: relative;
      display: flex;
      gap: 1.6rem;
      padding-bottom: 2.8rem;
      &:last-child {
        padding-bottom: 0;
      }

      .icon {
        position: relative;
        z-index: 1;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.7rem;
        flex-shrink: 0;
        background: #ffffff;
        box-shadow: 0 0 0 0.4rem #ffffff;
          &.add {
          color: #327c4e;
          background-color: #e9faef;
        }
        &.move {
          background: #eff6ff;
          color: #2563eb;
        }
        &.remove {
          background: #fdf4ff;
          color: #c026d3;
        }

        svg {
          width: 1.8rem;
          height: 1.8rem;
        }
      }

      .body {
        flex: 1;
        min-width: 0;
        padding-top: 0.6rem;

        .text {
          color: #2b2b2b;
          /* allow a/span/strong words to break mid-word when needed */
          overflow-wrap: anywhere;
          word-break: normal;

          a,
          span,
          strong {
            margin-right: 0.6rem;
            &:last-child {
              margin-right: 0;
            }
          }

          a,
          strong {
            font-weight: 500;
          }

          a {
            color: rgb(1, 59, 144);
            text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
          }

          .chip {
            display: inline-block;
            white-space: nowrap;
            overflow-wrap: normal;
            word-break: keep-all;
            vertical-align: middle;
            padding: 0.3rem 1.2rem;
            border-radius: 99rem;
            font-size: 1.61rem;
            font-weight: 500;

            /* tags */
            &.inDevelopment {
              color: #1E40AF;
              border: 1px solid #1E40AF;
              background-color: #DBEAFE;
            }
            &.readyForQa {
              color: #5027FF;
              background-color: #E1DBFE;
              border: 1px solid #5027FF;
            }
            &.inQa {
              color: #92400E;
              background-color: #FEF3C7;
              border: 1px solid #92400E;
            }
            &.failedQa {
              color: #991B1B;
              background-color: #FEE2E2;
              border: 1px solid #991B1B;
            }
            &.passedQa {
              color: #018A5D;
              border: 1px solid #018a5d;
              background: #F3F9F5;
            }
            &.completed {
              color: #166534;
              background-color: #DCFCE7;
              border: 1px solid #166534;
            }
            &.archived {
              color: #475569;
              background-color: #F1F5F9;
              border: 1px solid #475569;
            }

            /* columns */
            &.todo {
              color: #6366f1;
              border: 1px solid #6366f1;
              background: linear-gradient(to bottom, rgba(99, 102, 241, 0.08), transparent);
            }
            &.inProgress {
              color: #cc8100;
              border: 1px solid #f59e0b;
              background: linear-gradient(to bottom, rgba(245, 158, 11, 0.08), transparent);
            }
            &.completed {
              color: #166534;
              background-color: #DCFCE7;
              border: 1px solid #166534;
            }
          }
        }

        time {
          display: block;
          font-size: 1.5rem;
          color: #9a9a9a;
          margin-top: 0.4rem;
          min-height: 2.25rem;
        }

        .comment-preview {
          margin-top: var(--space-lite);
          padding: var(--space-lite);
          background: #fafafa;
          border-left: 0.3rem solid #e5e5e5;
          border-radius: 0 0.8rem 0.8rem 0;
          color: #4b4b4b;
          line-height: 1.6;
          margin-bottom: calc(var(--space-lite) / 2);
          font-size: 90%;
        }
      }
    }
  }

  .feed-footer {
    padding: var(--space);
    text-align: center;
    overflow: visible;

    hr {
      height: 1px;
      width: 100%;
      border: none;
      background: linear-gradient(90deg, transparent 0%, rgba(6, 27, 14, 0.1) 9%, rgba(6, 27, 14, 0.1) 91%, transparent 100%);
      margin: var(--space) 0;
    }

    button {
      display: inline-block;
      font-size: 90%;
    }
  }
`



const Chip = ((props) => {
  let key, label

  if ('tagId' in props) {
    const tag = enumObjectiveTags.get(props.tagId)
    if (!tag) throw new Error('!tag')

    key = tag.slug
    label = tag.label
  }

  if ('columnId' in props) {
    const column = enumObjectiveColumns.get(props.columnId)
    if (!column) throw new Error('!column')

    key = column.slug
    label = column.label
  }

  if (!key) throw new Error('!key', { cause: props })
  if (!label) throw new Error('!label', { cause: props })

  return <span class={`chip ${key}`}>{label}</span>
}) satisfies FC<{ tagId: number } | { columnId: number }>



const Anchor = (({ rpc, objective, objectiveBoardSlug }) => {
  return <>
    <a href={rpc.objectives[':slug'].$url({ param: { slug: objectiveBoardSlug }, query: { id: objective.id } }).href}>{objective.title}</a>
  </> 
}) satisfies FC<{ rpc: InferRpc<AppType>, objective: QueryObjectiveActivity['items'][number]['objective'], objectiveBoardSlug: typeof enumObjectiveBoards.$infer['slug'] }>



const ColumnChanged = (({ rpc, objective, objectiveBoardSlug, actorName, fromColumnId, toColumnId, epoch }) => {
  return <>
    <div class="event">
      <div class="icon move" aria-hidden="true">→</div>
      <div class="body">
        <div class="text">
          <strong>{actorName}</strong>
          <span>moved</span>
          <Anchor rpc={rpc} objective={objective} objectiveBoardSlug={objectiveBoardSlug} />
          <span>from</span>
          <Chip columnId={fromColumnId} />
          <span>to</span>
          <Chip columnId={toColumnId} />
        </div>
        <time data-directive={formatTime(epoch)} />
      </div>
    </div>
  </>
}) satisfies FC<{ rpc: InferRpc<AppType>, objective: QueryObjectiveActivity['items'][number]['objective'], objectiveBoardSlug: typeof enumObjectiveBoards.$infer['slug'], actorName: string, fromColumnId: number, toColumnId: number, epoch: number }>



const CommentAdded = (({ rpc, objective, objectiveBoardSlug, actorName, comment, epoch }) => {
  return <>
    <div class="event">
      <div class="icon add" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svgAddComment }} />
      <div class="body">
        <div class="text">
          <strong>{actorName}</strong>
          <span>commented on</span>
          <Anchor rpc={rpc} objective={objective} objectiveBoardSlug={objectiveBoardSlug} />
        </div>
        <div class="comment-preview">{comment}</div>
       <time data-directive={formatTime(epoch)} />
      </div>
    </div>
  </>
}) satisfies FC<{ rpc: InferRpc<AppType>, objective: QueryObjectiveActivity['items'][number]['objective'], objectiveBoardSlug: typeof enumObjectiveBoards.$infer['slug'], actorName: string, comment: string, epoch: number }>



const AssigneeAdded = (({ rpc, objective, objectiveBoardSlug, actorName, assigneeName, epoch }) => {
  return <>
    <div class="event">
      <div class="icon add" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svgPersonAdd }} />
      <div class="body">
        <div class="text">
          <strong>{actorName}</strong>
          <span>assigned</span>
          <strong>{assigneeName}</strong>
          <span>to</span>
          <Anchor rpc={rpc} objective={objective} objectiveBoardSlug={objectiveBoardSlug} />
        </div>
        <time data-directive={formatTime(epoch)} />
      </div>
    </div>
  </>
}) satisfies FC<{ rpc: InferRpc<AppType>, objective: QueryObjectiveActivity['items'][number]['objective'], objectiveBoardSlug: typeof enumObjectiveBoards.$infer['slug'], actorName: string, assigneeName: string, epoch: number }>



const AssigneeRemoved = (({ rpc, objective, objectiveBoardSlug, actorName, assigneeName, epoch }) => {
  return <>
    <div class="event">
      <div class="icon remove" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svgpPersonRemove }} />
      <div class="body">
        <div class="text">
          <strong>{actorName}</strong>
          <span>removed</span>
          <strong>{assigneeName}</strong>
          <span>from</span>
          <Anchor rpc={rpc} objective={objective} objectiveBoardSlug={objectiveBoardSlug} />
        </div>
        <time data-directive={formatTime(epoch)} />
      </div>
    </div>
  </>
}) satisfies FC<{ rpc: InferRpc<AppType>, objective: QueryObjectiveActivity['items'][number]['objective'], objectiveBoardSlug: typeof enumObjectiveBoards.$infer['slug'], actorName: string, assigneeName: string, epoch: number }>



const TagAdded = (({ rpc, objective, objectiveBoardSlug, actorName, tagId, epoch }) => {
  return <>
    <div class="event">
      <div class="icon add" aria-hidden="true">✦</div>
      <div class="body">
        <div class="text">
          <strong>{actorName}</strong>
          <span>added the tag</span>
          <Chip tagId={tagId} />
          <span>to</span>
          <Anchor rpc={rpc} objective={objective} objectiveBoardSlug={objectiveBoardSlug} />
        </div>
        <time data-directive={formatTime(epoch)} />
      </div>
    </div>
  </>
}) satisfies FC<{ rpc: InferRpc<AppType>, objective: QueryObjectiveActivity['items'][number]['objective'], objectiveBoardSlug: typeof enumObjectiveBoards.$infer['slug'], actorName: string, tagId: number, epoch: number }>



const TagRemoved = (({ rpc, objective, objectiveBoardSlug, actorName, tagId, epoch }) => {
  return <>
    <div class="event">
      <div class="icon remove" aria-hidden="true">✦</div>
      <div class="body">
        <div class="text">
          <strong>{actorName}</strong>
          <span>removed the tag</span>
          <Chip tagId={tagId} />
          <span>from</span>
          <Anchor rpc={rpc} objective={objective} objectiveBoardSlug={objectiveBoardSlug} />
        </div>
        <time data-directive={formatTime(epoch)} />
      </div>
    </div>
  </>
}) satisfies FC<{ rpc: InferRpc<AppType>, objective: QueryObjectiveActivity['items'][number]['objective'], objectiveBoardSlug: typeof enumObjectiveBoards.$infer['slug'], actorName: string, tagId: number, epoch: number }>



const ObjectiveCreated = (({ rpc, objective, objectiveBoardSlug, actorName, columnId, epoch }) => {
  return <>
    <div class="event">
      <div dangerouslySetInnerHTML={{ __html: svgAddDocument }} class="icon add" aria-hidden="true" />
      <div class="body">
        <div class="text">
          <strong>{actorName}</strong>
          <span>created</span>
          <Anchor rpc={rpc} objective={objective} objectiveBoardSlug={objectiveBoardSlug} />
          <span>and placed it into</span>
          <Chip columnId={columnId} />
        </div>
        <time data-directive={formatTime(epoch)} />
      </div>
    </div>
  </>
}) satisfies FC<{ rpc: InferRpc<AppType>, objective: QueryObjectiveActivity['items'][number]['objective'], objectiveBoardSlug: typeof enumObjectiveBoards.$infer['slug'], actorName: string, columnId: number, epoch: number }>
