// web/src/lib/onPageTabChange.directive.ts

import { tabsEvents } from '@hono-tabs'
import { createRPC } from '@hono-api/fe'
import type { AppType } from '@src/index'
import { onPageTabChange } from '@hono-tabs'
import { enumInboxPages } from '@src/enums/inboxPages.enum'
import { enumFinanceFormPages } from '@src/enums/financeFormPages.enum'


export default (el: HTMLDivElement, page: 'inbox' | 'finances') => {
  const rpc = createRPC<AppType>()

  tabsEvents.on('tabChanged', async (v) => {
    switch(page) {
      case 'inbox':
        if (enumInboxPages.has(v.id)) {
          onPageTabChange({
            el,
            id: v.id,
            pathname: rpc.inbox[':variant?'].$url({ param: { variant: v.id } }).pathname,
            getApiResponse: () => rpc.api.inbox[':variant?'].$get({ param: { variant: v.id } }),
            isLoaderPresent: (container) => container.firstElementChild?.classList.contains('loading') ?? false
          })
        }
        break
      case 'finances':
        if (enumFinanceFormPages.has(v.id)) {
          onPageTabChange({
            el,
            id: v.id,
            pathname: rpc['finance-forms'][':variant?'].$url({ param: { variant: v.id } }).pathname,
            getApiResponse: () => rpc.api['finance-forms'][':variant?'].$get({ param: { variant: v.id } }),
            isLoaderPresent: (container) => container.firstElementChild?.classList.contains('loading') ?? false
          })
        }
        break
    }
  })
}
