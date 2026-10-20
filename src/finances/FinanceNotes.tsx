// web/src/finances/FinanceNotes.tsx

import type { FC } from 'hono/jsx'
import { md2html } from '@src/md/md2html'
import { bindAccordionItems } from '@hono-directives'
import mdFinanceNotes from '@src/finances/financeNotes.md?raw'


export const FinanceNotes = (async () => {
  return <div data-directive={bindAccordionItems()} class="md" dangerouslySetInnerHTML={{ __html: await md2html(mdFinanceNotes, { wrapTables: true, enableAccordion: true }) }}></div>
}) satisfies FC
