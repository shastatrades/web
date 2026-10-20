// web/src/validators/financeFormPages.validator.ts

import * as v from 'valibot'
import { pipeSelect, Validator } from '@hono-form'
import { enumFinanceFormPages } from '@src/enums/financeFormPages.enum'


export const financeFormPagesValidator = new Validator(
  v.object({
    variant: pipeSelect({
      optional: true,
      values: enumFinanceFormPages.ids,
      errorInvalid: 'Please provide a valid page',
    })
  })
)
