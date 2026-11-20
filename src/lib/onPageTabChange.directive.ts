// web/src/lib/onPageTabChange.directive.ts

import { tabsEvents } from '@hono-tabs'
import { createRPC } from '@hono-api/fe'
import type { AppType } from '@src/index'
import { onPageTabChange } from '@hono-tabs'
import { enumFormPages } from '@src/enums/formPages.enum'
import { enumInboxPages } from '@src/enums/inboxPages.enum'


export default (el: HTMLDivElement, page: 'inbox' | 'forms') => {
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
      case 'forms':
        if (enumFormPages.has(v.id)) {
          onPageTabChange({
            el,
            id: v.id,
            pathname: rpc.forms[':variant?'].$url({ param: { variant: v.id } }).pathname,
            getApiResponse: () => rpc.api.forms[':variant?'].$get({ param: { variant: v.id } }),
            isLoaderPresent: (container) => container.firstElementChild?.classList.contains('loading') ?? false
          })
        }
        break
    }
  })
}
