// web/src/auth/ProfileNavigation.tsx

import type { FC } from 'hono/jsx'
import { AppType } from '@src/index'
import { createRPC } from '@hono-api/be'
import svgClose from '@src/svg/close.html?raw'
import { onNavModalToggle } from '@hono-directives'
import { datasetAuth, idAuthModal } from '@src/lib/dom'
import { enumFinanceFormPages } from '@src/enums/financeFormPages.enum'


export default (() => {
  const rpc = createRPC<AppType>()
  const authDataset = datasetAuth()
  const authModalId = idAuthModal().id

  return <>
    <div {...authDataset.attr('undefined')} id={authModalId} class="modal-wrapper modal-hidden">
      <button data-directive={onNavModalToggle(authModalId)} class="backdrop" type="button" />

      <div class="modal">
        <div class="header">
          <span>Profile Navigation</span>
          <button
            class="close"
            type="button"
            dangerouslySetInnerHTML={{__html: svgClose}}
            data-directive={onNavModalToggle(authModalId)} />
        </div>

        <div {...authDataset.attr('loading')} class="item lite">Loading...</div>
        <a {...authDataset.attr('false')} href={rpc['sign-in'].$url().href} class="item anchor">Sign In</a>
        <a {...authDataset.attr('false')} href={rpc['sign-up'].$url().href} class="item anchor">Sign Up</a>
        <a {...authDataset.attr('true')} href={rpc.inbox[':variant?'].$url({ param: { variant: 'objective-activity' }}).href} class="item anchor">Inbox</a>
        <a {...authDataset.attr('true')} href={rpc['finance-forms'][':variant?'].$url({ param: { variant: enumFinanceFormPages.ids[0] } }).href} class="item anchor">Finance Forms</a>
        <a {...authDataset.attr('true')} href={rpc['finance-notes'].$url().href} class="item anchor">Finance Notes</a>
        <a {...authDataset.attr('true')} href={rpc['edit-profile'].$url().href} class="item anchor">Edit Your Profile</a>
        <a {...authDataset.attr('true')} href={rpc['sign-out'].$url().href} class="item anchor">Sign Out</a>
      </div>
    </div>
  </>
}) satisfies FC
