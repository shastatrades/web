// web/src/api/financeForms.api.tsx

import { Hono } from 'hono'
import { validator } from '@hono-api/be'
import { IntentForms } from '@src/finances/IntentForms'
import { financeFormPagesValidator } from '@src/validators/financeFormPages.validator'


export default new Hono()
  .get(
    '/:variant?',
    validator('param', financeFormPagesValidator.schema),
    async (c) => {
      switch (c.req.valid('param').variant) {
        case 'intent': return c.html(<IntentForms />)
        default: return c.html(<></>)
      }
    }
  )
