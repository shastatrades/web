// web/src/profile/profile.route.tsx

import { Hono } from 'hono'
import { css, Style } from 'hono/css'
import Loading from '@src/lib/Loading'
import { validator } from '@hono-api/be'
import { onPageTabChange } from '@hono-directives'
import { JobLeads } from '@src/inbox/JobLeads'
import { authRoute } from '@src/auth/authRoute'
import { StaffLeads } from '@src/inbox/StaffLeads'
import { subPageHeroStyle } from '@src/lib/subPageHeroStyle'
import { enumInboxPages } from '@src/enums/inboxPages.enum'
import { ContactUsMessages } from '@src/inbox/ContactUsMessages'
import { tabsStyle, PageTabs, type PageTabsParameters } from '@hono-tabs'
import { inboxPagesValidator } from '@src/validators/inboxPages.validator'
import { ObjectiveActivity, objectiveActivityStyle } from '@src/lib/ObjectiveActivity'
import { queryObjectiveActivity, queryStaffPerson, type Person, type QueryStaffPerson } from '@src/db'


export default new Hono()
  .get(
    '/:variant?',
    validator('param', inboxPagesValidator.schema),
    async (c) => {
    const resAuthRoute = await authRoute(c)
    if (!resAuthRoute.authenticated) return c.redirect(resAuthRoute.redirect)

    const { person } = resAuthRoute.resSession.response

    const variant = c.req.valid('param').variant ?? 'objective-activity'

    const resStaff: QueryStaffPerson = await queryStaffPerson(person.id)

    const pages = (!resStaff?.positions.length)
      ? []
      : await getPages(person) 

    return c.render(
      <>
        <title>Shasta Trades · Profile</title>
        <Style>{tabsStyle}</Style>
        <Style>{subPageHeroStyle}</Style>
        <Style>{objectiveActivityStyle}</Style>
        <Style>{style}</Style>

        <div class="profile">
          <div class="sub-page-hero">
            <div class="bg"></div>
            <div class="header">
              <h1>Inbox</h1>
              <div class="space-between">
                <div class="sub-title">Welcome {person.firstName} {person.lastName} to your notification station!</div>
              </div>
            </div>
          </div>

          <div data-directive={onPageTabChange('inbox')} class="page-content">
            <PageTabs name="inbox" loader={<Loading />} page={variant} pages={pages} />
          </div>
        </div>
      </>
    )
  })


async function getObjectiveActivity(person: typeof Person.$inferSelect) {
  const res = await queryObjectiveActivity({ variant: 'personal', sessionPersonId: person.id })
  return <ObjectiveActivity res={res} />
}


async function getPages(person: typeof Person.$inferSelect): Promise<PageTabsParameters['pages']> {
  return await Promise.all(
    enumInboxPages.array.map(async (v) => {
      switch (v.id) {
        case 'objective-activity':
          return { ...v, content: await getObjectiveActivity(person) }
        case 'job-leads':
          return { ...v, content: <JobLeads /> }
        case 'staff-leads':
          return { ...v, content: <StaffLeads /> }
        case 'contact-us-messages':
          return { ...v, content: <ContactUsMessages /> }
      }
    })
  )
}



export const style = css`
  .profile {
    .sub-page-hero {
      .space-between {
        display: flex;
        gap: var(--space);
        justify-content: space-between;

        @media (max-width: 720px) {
          flex-direction: column;
        }

        .chips {
          display: flex;
          justify-content: end;
          flex-grow: 1;
          gap: calc(var(--space-lite) / 2);

          @media (max-width: 720px) {
            flex-wrap: wrap;
            flex-grow: 0;
            justify-content: center;
          }

          .chip {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 3rem;
            opacity: 0.90;
            background-color: var(--primary);
            border: 1px solid rgba(249, 251, 249, 0.24);
            color: #f9fbf9;
            -webkit-box-shadow: -4px 5px 8px -2px rgba(0,0,0,0.53); 
            box-shadow: -4px 5px 8px -2px rgba(0,0,0,0.53);
            font-size: 81%;
            transition: var(--fast-transition);
            padding: 0.1rem 0.9rem;
            border-radius: calc(var(--radius) * 3);
            white-space: nowrap;
          }
        }
      }
    }

    .bucket {
      --accent: #2f6f8f;
      --tint: #eaf2f7;

      background: #ffffff;
      border: 0.1rem solid #e4e8ee;
      border-radius: 1.8rem;
      box-shadow:
        0 0.2rem 0.4rem rgba(29, 36, 48, 0.04),
        0 1.6rem 2.8rem -1.8rem rgba(29, 36, 48, 0.22);
      overflow: hidden;

      &.service {
        --accent: #1f7a63;
        --tint: #e7f4ef;
      }

      &.lead {
        --accent: #4b5bd6;
        --tint: #eceefc;
      }

      &.contact {
        --accent: #97650f;
        --tint: #fbf1dd;
      }

      .bhead {
        display: flex;
        align-items: center;
        gap: 1.2rem;
        padding: 1.8rem 2.4rem;
        background: var(--tint);
        border-bottom: 0.1rem solid #e4e8ee;

        .dot {
          width: 1rem;
          height: 1rem;
          flex: none;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 0.4rem #ffffff;
        }

        h2 {
          margin: 0;
          font-size: 1.6rem;
          font-weight: 700;
          letter-spacing: 0.01rem;
          color: #17202c;
        }

        .count {
          margin-left: auto;
          padding: 0.3rem 1.1rem;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--accent);
          background: #ffffff;
          border-radius: 999rem;
        }
      }

      /* ---------- entry ---------- */

      .entry {
        padding: 2rem 2.4rem;
        border-top: 0.1rem solid #eef1f5;
        transition: background-color 0.15s ease;

        &:first-child {
          border-top: 0;
        }

        &:hover {
          background: #fafbfc;
        }

        .who {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.4rem 1.2rem;

          .name {
            font-size: 1.6rem;
            font-weight: 600;
            color: #131b26;
            min-width: 13.3rem;
          }

          .email {
            font-size: 81%;
            color: #5f6a7a;
            text-decoration: none;

            &:hover {
              color: var(--accent);
              text-decoration: underline;
            }
          }

          .when {
            margin-left: auto;
            font-size: 81%;
            color: #98a1ae;
            white-space: nowrap;
          }
        }

        .fields {
          display: grid;
          grid-template-columns: 13rem 1fr;
          gap: 0.8rem 1.6rem;
          margin: 1.4rem 0 0;

          @media (max-width: 52rem) {
            grid-template-columns: 1fr;
            gap: 0.2rem 0;

            dd {
              margin-bottom: 0.8rem;
            }
          }

          dt {
            padding-top: 0.3rem;
            font-size: 1.15rem;
            font-weight: 700;
            letter-spacing: 0.08rem;
            text-transform: uppercase;
            color: #8d97a5;
          }

          dd {
            margin: 0;
            color: #2c3542;
          }
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin: 0;
          padding: 0;
          list-style: none;

          li {
            padding: 0.2rem 1rem;
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--accent);
            background: var(--tint);
            border-radius: 999rem;
          }
        }
      }
    }

    .loading {
      display: block;
      margin: 0 auto;
    }
  }
`
