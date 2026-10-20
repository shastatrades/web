// web/src/finances/financeNotes.route.tsx

import { Hono } from 'hono'
import { Style } from 'hono/css'
import { mdStyle } from '@src/md/mdStyle'
import { FinanceNotes } from '@src/finances/FinanceNotes'
import { subPageHeroStyle } from '@src/lib/subPageHeroStyle'


export default new Hono()
  .get('/', c => {
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
        <FinanceNotes />
      </div>
    </>)
  })
