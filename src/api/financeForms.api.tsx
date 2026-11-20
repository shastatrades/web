// web/src/api/financeForms.api.tsx

import { Hono } from 'hono'
import { validator } from '@hono-api/be'
import { InflowForms } from '@src/finances/InflowForms'
import { financeFormPagesValidator } from '@src/validators/financeFormPages.validator'


export default new Hono()
  .get(
    '/:variant?',
    validator('param', financeFormPagesValidator.schema),
    async (c) => {
      switch (c.req.valid('param').variant) {
        case 'inflow': return c.html(<InflowForms />)
        default: return c.html(<></>)
      }
    }
  )
