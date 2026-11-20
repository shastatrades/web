// web/src/validators/formPages.validator.ts

import * as v from 'valibot'
import { pipeSelect, Validator } from '@hono-form'
import { enumFormPages } from '@src/enums/formPages.enum'


export const formPagesValidator = new Validator(
  v.object({
    variant: pipeSelect({
      optional: true,
      values: enumFormPages.ids,
      errorInvalid: 'Please provide a valid page',
    })
  })
)
