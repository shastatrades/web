// web/src/api/forms.api.tsx

import { Hono } from 'hono'
import { validator } from '@hono-api/be'
import { IncomeForms } from '@src/finances/IncomeForms'
import { formPagesValidator } from '@src/validators/formPages.validator'


export default new Hono()
  .get(
    '/:variant?',
    validator('param', formPagesValidator.schema),
    async (c) => {
      switch (c.req.valid('param').variant) {
        case 'income': return c.html(<IncomeForms />)
        default: return c.html(<></>)
      }
    }
  )
