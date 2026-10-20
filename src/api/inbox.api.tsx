// web/src/api/inbox.api.tsx

import { Hono } from 'hono'
import { JobLeads } from '@src/inbox/JobLeads'
import { queryObjectiveActivity } from '@src/db'
import { onError, validator } from '@hono-api/be'
import { getSession } from '@src/auth/getSession'
import { StaffLeads } from '@src/inbox/StaffLeads'
import { ObjectiveActivity } from '@src/lib/ObjectiveActivity'
import { ContactUsMessages } from '@src/inbox/ContactUsMessages'
import { inboxPagesValidator } from '@src/validators/inboxPages.validator'


export default new Hono()
  .get(
    '/:variant?',
    validator('param', inboxPagesValidator.schema),
    async (c) => {  
      const resSession = await getSession(c, 'include-staff')
      if (resSession.status !== 200) return onError(c, resSession)

      switch (c.req.valid('param').variant) {
        case 'job-leads': return c.html(<JobLeads />)
        case 'staff-leads': return c.html(<StaffLeads />)
        case 'contact-us-messages': return c.html(<ContactUsMessages />)
        default:
        case 'objective-activity':
          const res = await queryObjectiveActivity({ variant: 'personal', sessionPersonId: resSession.response.person.id })
          return c.html(<ObjectiveActivity res={res} />)
      }
    }
  )
