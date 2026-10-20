// web/npm/hono-tabs/onPageTabChange.ts

import { query } from '@hono-dom'
import type { ClientResponse } from 'hono/client'
import { runDirectivesOnDemand } from '@hono-directives-run'


/**
 * - Updates the browser URL via `history.replaceState` based on `props.pathname`
 * - IF the tab body container currently displays a loader THEN we fetch/render the tab's HTML content via `props.getApiResponse()` AND run directives via `runDirectivesOnDemand()`
 * @example
 * ```ts
    
  import { tabsEvents } from '@hono-tabs'
  import { createRPC } from '@hono-api/fe'
  import type { AppType } from '@src/index'
  import { onPageTabChange } from '@hono-tabs'
  import { enumInboxPages } from '@src/enums/inboxPages.enum'


  export default (el: HTMLDivElement) => {
    const rpc = createRPC<AppType>()

    tabsEvents.on('tabChanged', async (v) => {
      if (enumInboxPages.has(v.id)) {
        onPageTabChange({
          el,
          id: v.id,
          pathname: rpc.inbox[':variant?'].$url({ param: { variant: v.id } }).pathname,
          getApiResponse: () => rpc.api.inbox[':variant?'].$get({ param: { variant: v.id } }),
          isLoaderPresent: (container) => container.firstElementChild?.classList.contains('loading') ?? false
        })
      }
    })
  }
 * ```
 * @param props - Configuration properties including tab element references, state URL, and API retriever function.
 */
export async function onPageTabChange(props: OnPageTabChangeProps) {
  history.replaceState(history.state, '', props.pathname)

  const container = query<HTMLDivElement>('#' + props.id).root(props.el).one()

  if (props.isLoaderPresent(container)) { // IF showing loading icon THEN add content
    const response = await props.getApiResponse()

    container.innerHTML = await response.text()

    runDirectivesOnDemand(props.el)
  }
}


export type OnPageTabChangeProps = {
  /** DOM id, unique id for the page */
  id: string,
  /** Root element for page tabs, helps us do DOM queries for only this area of the page */
  el: HTMLElement,
  /** The URL pathname to update the browser's history state with */
  pathname: string,
  /** A function that returns a promise resolving to the Hono client response for the new tab content */
  getApiResponse: () => Promise<ClientResponse<any>>,
  /** A function to determine if the container is currently showing a loader component, the `container` is the the first `<div />` w/in the `<Tabs />` body that has the tab's unique id as its dom id and is automatically placed by the `<PageTabs />` component */
  isLoaderPresent: (container: HTMLDivElement) => boolean,
}
