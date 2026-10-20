// web/npm/hono-tabs/PageTabs.tsx

import { Tabs } from './tabs'
import type { FC, Child } from 'hono/jsx'


export const PageTabs = (({ page, loader, pages, name }) => {
  return <>
    <Tabs variant="underline" align="center" name={name} tabs={
      pages.map(p => ({
        id: p.id,
        label: p.label,
        isInitiallyActive: page === p.id,
        content: <>
          <div id={p.id}>
            {page === p.id ? p.content : loader}
          </div>
        </>
      }))
    } />
  </>
}) satisfies FC<{ page: string, loader: Child, name: string, pages: { id: string, label: string, content: Child }[] }>


export type PageTabsParameters = Parameters<typeof PageTabs>[0]
