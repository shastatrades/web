// web/src/api/objectiveActivity.api.tsx

import { Hono } from 'hono'
import * as v from 'valibot'
import { pipeSelect } from '@hono-form'
import { validator } from '@hono-api/be'
import { queryObjectiveActivity } from '@src/db'
import { ObjectiveActivity } from '@src/lib/ObjectiveActivity'
import { enumObjectiveBoards, objectiveBoardSlugs } from '@src/enums/objectiveBoards.enum'


export default new Hono()
  .get(
    '/:slug',
    validator('param', v.object({
      slug: pipeSelect({
        values: objectiveBoardSlugs,
        errorMissing: 'Please provide a board slug',
        errorInvalid: 'Please provide a valid board slug',
      })
    })),
    async (c) => {
      const slug = c.req.valid('param').slug 
      const res = await queryObjectiveActivity({ variant: 'all', boardId: enumObjectiveBoards.slug[slug].id })
      return c.html(<ObjectiveActivity res={res} />)
    })
