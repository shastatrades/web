// web/src/validators/inboxPages.validator.ts

import * as v from 'valibot'
import { pipeSelect, Validator } from '@hono-form'
import { enumInboxPages } from '@src/enums/inboxPages.enum'


export const inboxPagesValidator = new Validator(
  v.object({
    variant: pipeSelect({
      optional: true,
      values: enumInboxPages.ids,
      errorInvalid: 'Please provide a valid page',
    })
  })
)
