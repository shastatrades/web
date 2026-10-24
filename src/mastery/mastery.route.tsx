// web/src/mastery/mastery.route.tsx

import { Hono } from 'hono'
import { Style } from 'hono/css'
import { datasetId } from '@src/lib/dom'
import { md2html } from '@src/md/md2html'
import { mdStyle } from '@src/md/mdStyle'
import { queryStudyGuide } from './queryStudyGuide'
import { tabsStyle,  Tabs, type Tab } from '@hono-tabs'
import { subPageHeroStyle } from '@src/lib/subPageHeroStyle'
import { enumMasteryMarkdowns } from '@src/enums/masteryMarkdowns.enum'
import { bindAccordionItems, onStudyGuideLoad } from '@hono-directives'
import { enumStudyGuideSections } from '@src/enums/studyGuideSections.enum'


export default new Hono()
  .get('/:id?', async (c) => {
    const paramId = c.req.param('id') ?? enumMasteryMarkdowns.array[0].id
    const current = enumMasteryMarkdowns.get(paramId) ?? enumMasteryMarkdowns.array[0]
    const html = await md2html(current.md, current)

    let subHtml = ''
    let subVerifiedIdQuery = ''

    if (current.id === enumMasteryMarkdowns.obj['2025-class-b-study-guide'].id) {
      const { verifiedId, html } = await queryStudyGuide(c.req.query('sub'))
      subVerifiedIdQuery = verifiedId
      subHtml = html
    }

    return c.render(
      <>
        <title>Shasta Trades · Mastery · {current.title}</title>
        <Style>{mdStyle}</Style>
        <Style>{tabsStyle}</Style>
        <Style>{subPageHeroStyle}</Style>

        <div class="mastery" data-directive={bindAccordionItems()}>
          <div class="sub-page-hero">
            <div class="bg"></div>
            <div class="header">
              <h1>Mastery</h1>
              <div class="sub-title">A public knowledge base designed to help aspiring tradespeople obtain and maintain mastery!</div>
            </div>

            <div class="buttons">
              {enumMasteryMarkdowns.array.map(v => <a class={paramId === v.id ? 'orange big' : 'transparent big'} href={'/mastery/' + v.id}>{v.title}</a>)}
            </div>
          </div>

          <div class="md page-content" data-directive={onStudyGuideLoad()}>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>

            {
              subHtml && <Tabs
                variant="underline"
                name="study-guide-tabs"
                tabs={enumStudyGuideSections.array.map(s => createTab(s.id, s.label, subHtml, subVerifiedIdQuery))} />
            }
          </div>
        </div>
      </>
    )
  })


function createTab(id: string, label: string, html: string, subVerifiedIdQuery: string): Tab {
  return {
    id,
    label,
    isInitiallyActive: subVerifiedIdQuery === id,
    content: <div
      style="min-height: 35rem"
      {...datasetId().attr(id)}
      dangerouslySetInnerHTML={{ __html: subVerifiedIdQuery === id ? html : '' }}></div>
  }
}
