// web/src/finances/financeForms.route.tsx

import { Hono } from 'hono'
import { css, Style } from 'hono/css'
import Loading from '@src/lib/Loading'
import { validator } from '@hono-api/be'
import { mdStyle } from '@src/md/mdStyle'
import { authRoute } from '@src/auth/authRoute'
import { onPageTabChange } from '@hono-directives'
import { IncomeForms } from '@src/finances/IncomeForms'
import { enumFormPages } from '@src/enums/formPages.enum'
import { subPageHeroStyle } from '@src/lib/subPageHeroStyle'
import { formPagesValidator } from '@src/validators/formPages.validator'
import { tabsStyle, PageTabs, type PageTabsParameters } from '@hono-tabs'


export default new Hono()
  .get(
    '/:variant?',
    validator('param', formPagesValidator.schema),
    async (c) => {
      const resAuthRoute = await authRoute(c)
      if (!resAuthRoute.authenticated) return c.redirect(resAuthRoute.redirect)

      const variant = c.req.valid('param').variant ?? enumFormPages.array[0]

      const pages: PageTabsParameters['pages'] = enumFormPages.array.map(v => {
        switch(v.id) {
          case 'income': return { ...v, content: <IncomeForms /> }
          default: return { ...v, content: <></> }
        }
      })

      return c.render(
        <>
          <title>Shasta Trades · Forms</title>
          <Style>{tabsStyle}</Style>
          <Style>{subPageHeroStyle}</Style>
          <Style>{mdStyle}</Style>
          <Style>{style}</Style>

          <div data-directive={onPageTabChange('forms')} class="forms">
            <div class="sub-page-hero">
              <div class="bg"></div>
              <div class="header">
                <h1>Forms</h1>
                <div class="sub-title">Help us track what's happening</div>
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
  .forms {

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
