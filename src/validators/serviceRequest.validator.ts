// web/src/validators/serviceRequest.validator.ts

import * as v from 'valibot'
import { enumTrades } from '@src/enums/trades.enum'
import { pipeEmail, pipeArray, pipeEnoughContent, Validator } from '@hono-form'


export const serviceRequestValidator = new Validator(
  v.object({
    email: pipeEmail,
    firstName: pipeEnoughContent({ count: 2, error: 'Please provide at least 2 characters' }),
    lastName: pipeEnoughContent({ count: 2, error: 'Please provide at least 2 characters' }),
    description: pipeEnoughContent({ count: 9, error: 'Please enter at least 9 characters' }),
    trade: pipeArray({
      values: enumTrades.ids.map(id => String(id)),
      errorMissing: 'Please select at least one trade',
      errorInvalid: 'Please select at least one valid trade',
    })
  })
)
