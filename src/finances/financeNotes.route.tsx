// web/src/finances/financeNotes.route.tsx

import { Hono } from 'hono'
import { css, Style } from 'hono/css'
import { mdStyle } from '@src/md/mdStyle'
import { md2html } from '@src/md/md2html'
import svgClose from '@src/svg/close.html?raw'
import svgSearch from '@src/svg/search.html?raw'
import { searchStyle, SearchInput } from '@hono-search'
import { subPageHeroStyle } from '@src/lib/subPageHeroStyle'
import mdFinanceNotes from '@src/finances/financeNotes.md?raw'
import { bindAccordionItems, onFinanceNotesLoad } from '@hono-directives'
import { idNoResults } from '@src/lib/dom'


const noResultsId = idNoResults()


export default new Hono()
  .get('/', async (c) => {
    const md = await md2html(mdFinanceNotes, { wrapTables: true, enableAccordion: true })

    return c.render(<>
      <title>Shasta Trades · Finance Notes</title>
      <Style>{subPageHeroStyle}</Style>
      <Style>{mdStyle}</Style>
      
      <div class="sub-page-hero">
        <div class="bg"></div>
        <div class="header">
          <h1>Finance Notes</h1>
          <div class="sub-title">Our finance forms help our staff track what happened, our finance visualization help our Board make decisions and our finance visualizations help our accountants file vital forms.</div>
        </div>
      </div>

      <div class="page-content">
        <div class="page-content">
          <Style>{style}</Style>
          <Style>{searchStyle}</Style>
          <div data-directive={onFinanceNotesLoad()}>
            <SearchInput svgClose={svgClose} svgSearch={svgSearch} />
          </div>
          <div data-directive={bindAccordionItems()} class="md" dangerouslySetInnerHTML={{ __html: md }}></div>
          <div id={noResultsId.id} class="hidden">No search results found</div>
        </div>
      </div>
    </>)
  })


const style = css`
  ${noResultsId.query} {
    color: #004085;
    background-color: #cce5ff;
    border: 1px solid #b8daff;
    padding: var(--space-lite);
    border-radius: calc(var(--radius) * 2);
  }
`
