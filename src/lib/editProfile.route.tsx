// web/src/profile/profile.route.tsx

import { Hono } from 'hono'
import { Field } from '@hono-form'
import { css, Style } from 'hono/css'
import { authRoute } from '@src/auth/authRoute'
import { idAvatar, idEditYourProfile } from '@src/lib/dom'
import { subPageHeroStyle } from '@src/lib/subPageHeroStyle'
import { queryStaffPerson, type QueryStaffPerson } from '@src/db'


const avatarId = idAvatar()


export default new Hono()
  .get('/', async (c) => {
    const resAuthRoute = await authRoute(c)
    if (!resAuthRoute.authenticated) return c.redirect(resAuthRoute.redirect)
    
    const { person, contact } = resAuthRoute.resSession.response

    const resStaff: QueryStaffPerson = await queryStaffPerson(person.id)

    return c.render(
      <>
        <title>Shasta Trades · Profile</title>
        <Style>{subPageHeroStyle}</Style>
        <Style>{style}</Style>

        <div class="profile">
          <div class="sub-page-hero">
            <div class="bg"></div>
            <div class="header">
              <h1> Edit Your Profile</h1>
              <div class="space-between">
                <div class="sub-title">Please feel free to edit your personal settings</div>
                <div class="chips">
                  {
                    resStaff?.positions && resStaff.positions
                      .map((p) => <div className="chip" key={p.id}>{p.value}</div>)
                  }
                </div>
              </div>
            </div>
          </div>

          <div class="page-content">
            <form id={idEditYourProfile().id} class="form-card bg-white">
              <div class="title">Edit Your Profile</div>

              <div class="two">
                <Field type="text" label="First Name" name="firstName" prefix="profile-update" value={person.firstName} />
                <Field type="text" label="Last Name" name="lastName" prefix="profile-update" value={person.lastName} />
              </div>

              <Field type="file" label="Avatar" name="img" prefix="profile-update" />
              <Field type="checkbox" label="Newsletter" name="newsletter" options={[{ label: 'Receive one monthy Shasta Trades email', value: 'true' }]} value={contact.sendNewsletter ? 'true' : ''} prefix="profile-update" />
              <img id={avatarId.id} class={person.imageId ? '' : 'hidden'} src={`https://r2.shastatrades.org/${person.imageId}.webp`} />
              <button type="submit" class="primary">Save</button>
            </form>
          </div>
        </div>
      </>
    )
  })



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

    .form-card {
      margin-top: 0;
      margin-inline: auto !important;

      #${avatarId.id} {
        max-width: 100%;
        margin-bottom: var(--space-lite);
      }
    }
  }
`
