// web/src/finances/financeForms.route.tsx

import { Hono } from 'hono'
import { css, Style } from 'hono/css'
import Loading from '@src/lib/Loading'
import { validator } from '@hono-api/be'
import { mdStyle } from '@src/md/mdStyle'
import { authRoute } from '@src/auth/authRoute'
import { onPageTabChange } from '@hono-directives'
import { IntentForms } from '@src/finances/IntentForms'
import { subPageHeroStyle } from '@src/lib/subPageHeroStyle'
import { enumFinanceFormPages } from '@src/enums/financeFormPages.enum'
import { tabsStyle, PageTabs, type PageTabsParameters } from '@hono-tabs'
import { financeFormPagesValidator } from '@src/validators/financeFormPages.validator'


export default new Hono()
  .get(
    '/:variant?',
    validator('param', financeFormPagesValidator.schema),
    async (c) => {
      const resAuthRoute = await authRoute(c)
      if (!resAuthRoute.authenticated) return c.redirect(resAuthRoute.redirect)

      const variant = c.req.valid('param').variant ?? enumFinanceFormPages.array[0]

      const pages: PageTabsParameters['pages'] = enumFinanceFormPages.array.map(v => {
        switch(v.id) {
          case 'intent': return { ...v, content: <IntentForms /> }
          default: return { ...v, content: <></> }
        }
      })

      return c.render(
        <>
          <title>Shasta Trades · Finance Forms</title>
          <Style>{tabsStyle}</Style>
          <Style>{subPageHeroStyle}</Style>
          <Style>{mdStyle}</Style>
          <Style>{style}</Style>

          <div data-directive={onPageTabChange('finances')} class="finance-forms">
            <div class="sub-page-hero">
              <div class="bg"></div>
              <div class="header">
                <h1>Finance Forms</h1>
                <div class="sub-title">Our finance forms help our staff track what happened.</div>
              </div>
            </div>

            <div class="page-content">
              <PageTabs name="finance-forms" page={variant as string} loader={<Loading />} pages={pages} />
            </div>
          </div>
        </>
      )
    })


export const style = css`
  .finance-forms {

    /** all accordions */
    .tabs__contents {
      min-height: 70vh;
      max-width: 54rem;
      margin: var(--space-lite) auto;

      .loading {
        display: block;
        margin: 0 auto;
      }
    }

    .accordion-title {
      .with-icon {
        display: flex;
        align-items: center;
        gap: calc(var(--space-lite) / 1.5);

        .icon {
          height: 2.4rem;
          width: 2.4rem;

          svg {
            width: 100%;
            height: 100%;
            color: var(--primary);
          }
        }
      }
    }
  }
`
