// web/src/validators/joinLeadership.validator.ts

import * as v from 'valibot'
import { enumStaffPositions } from '@src/enums/staffPositions.enum'
import { pipeEmail, pipeSelect, pipeEnoughContent, Validator } from '@hono-form'


export const joinLeadershipValidator = new Validator(
  v.object({
    email: pipeEmail,
    firstName: pipeEnoughContent({ count: 2, error: 'Please provide at least 2 characters' }),
    lastName: pipeEnoughContent({ count: 2, error: 'Please provide at least 2 characters' }),
    interest: pipeSelect({
      values: enumStaffPositions.ids.map(id => String(id)),
      errorMissing: 'Please select a position',
      errorInvalid: 'Please select a valid position',
    })
  })
)
