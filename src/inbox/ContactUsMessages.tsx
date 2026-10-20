// web/src/inbox/ContactUsMessages.tsx

import type { FC } from 'hono/jsx'
import { formatTime } from '@hono-directives'
import { queryContactUsMessages } from '@src/db'


export const ContactUsMessages = (async () => {
  const res = await queryContactUsMessages()

  return <>
    <section class="bucket contact" aria-labelledby="bucket-contact">
      <div class="bhead">
        <span class="dot" aria-hidden="true"></span>
        <h2 id="bucket-contact">Contact Us Messages</h2>
        <span class="count">{res.length}</span>
      </div>
      <div class="entries">
        {
          res.map(m => <>
            <article class="entry">
              <div class="who">
                <span class="name">{m.person.firstName} {m.person.lastName}</span>
                <a class="email" href={`mailto${m.person.email}`}>{m.person.email}</a>
                <span class="when" data-directive={formatTime(m.createdAt)}></span>
              </div>
              <dl class="fields">
                <dt>Message</dt>
                <dd>{m.message}</dd>
              </dl>
            </article>
          </>)
        }
      </div>
    </section>
  </>
}) satisfies FC
