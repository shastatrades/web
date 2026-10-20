// web/src/index.tsx

import { Hono } from 'hono'
import tags from '@src/api/tags.api'
import pdf from '@src/lib/pdf.route'
import staff from '@src/api/staff.api'
import home from '@src/home/home.route'
import people from '@src/api/people.api'
import inboxApi from '@src/api/inbox.api'
import signInApi from '@src/api/signIn.api'
import signUpApi from '@src/api/signUp.api'
import sessionApi from '@src/api/session.api'
import profileApi from '@src/api/profile.api'
import contactUs from '@src/api/contactUs.api'
import objective from '@src/api/objective.api'
import inboxRoute from '@src/inbox/inbox.route'
import mastery from '@src/mastery/mastery.route'
import signInRoute from '@src/auth/signIn.route'
import signUpRoute from '@src/auth/signUp.route'
import { renderer } from '@src/renderer/renderer'
import signOutRoute from '@src/auth/signOut.route'
import studyGuideApi from '@src/api/studyGuide.api'
import magicLinkRoute from '@src/auth/magicLink.route'
import financeFormsApi from '@src/api/financeForms.api'
import transparencyApi from '@src/api/transparency.api'
import serviceRequest from '@src/api/serviceRequest.api'
import joinLeadership from '@src/api/joinLeadership.api'
import joinNewsletter from '@src/api/joinNewsletter.api'
import objectives from '@src/objectives/objectives.route'
import editProfileRoute from '@src/lib/editProfile.route'
import financeNotes from '@src/finances/financeNotes.route'
import objectiveActivity from '@src/api/objectiveActivity.api'
import objectiveCommentApi from '@src/api/objectiveComment.api'
import financeFormsRoute from '@src/finances/financeForms.route'
import transparencyRoute from '@src/transparency/transparency.route'

const app = new Hono()
  .use(renderer)
  .route('/', home)
  .route('/pdf', pdf)
  .route('/api/tags', tags)
  .route('/mastery', mastery)
  .route('/api/staff', staff)
  .route('/inbox', inboxRoute)
  .route('/api/people', people)
  .route('/api/inbox', inboxApi)
  .route('/sign-in', signInRoute)
  .route('/sign-up', signUpRoute)
  .route('/sign-out', signOutRoute)
  .route('/api/sign-in', signInApi)
  .route('/api/sign-up', signUpApi)
  .route('/objectives', objectives)
  .route('/api/profile', profileApi)
  .route('/api/session', sessionApi)
  .route('/api/objective', objective)
  .route('/api/contact-us', contactUs)
  .route('/magic-link', magicLinkRoute)
  .route('/finance-notes', financeNotes)
  .route('/api/study-guide', studyGuideApi)
  .route('/edit-profile', editProfileRoute)
  .route('/transparency', transparencyRoute)
  .route('/finance-forms', financeFormsRoute)
  .route('/api/transparency', transparencyApi)
  .route('/api/finance-forms', financeFormsApi)
  .route('/api/join-leadership', joinLeadership)
  .route('/api/join-newsletter', joinNewsletter)
  .route('/api/service-request', serviceRequest)
  .route('/api/objective-activity', objectiveActivity)
  .route('/api/objective-comment', objectiveCommentApi)

export default app

export type AppType = typeof app
