// web/src/finances/InflowForms.tsx

import { Field } from '@hono-form'
import type { FC } from 'hono/jsx'
import svgSend from '@src/svg/send.html?raw'
import svgMoney from '@src/svg/money.html?raw'
import svgCheck from '@src/svg/check.html?raw'
import svgPerson from '@src/svg/person.html?raw'
import svgExplore from '@src/svg/explore.html?raw'
import { enumFunds } from '@src/enums/funds.enum'
import { bindAccordionItems } from '@hono-directives'
import svgHandshake from '@src/svg/handShake.html?raw'
import svgGoldMedal from '@src/svg/goldMedal.html?raw'
import { enumGrantFit } from '@src/enums/grantFit.enum'
import { Accordion, AccordionItem } from '@hono-accordion'
import { enumDonorTypes } from '@src/enums/donorTypes.enum'
import svgCloseWithCircle from '@src/svg/closeWithCircle.html?raw'
import { enumPledgeFrequencies } from '@src/enums/pledgeFrequencies.enum'


export const InflowForms = (() => {
  return <>
    <div data-directive={bindAccordionItems()} class="inflow-forms">
      <Accordion items={[
        metDonor(),
        donationReceived(),
        pledgeReceived(),
        pledgePaymentReceived(),
        foundGrant(),
        appliedToGrant(),
        wonGrant(),
        lostGrant(),
      ]} />
    </div>
  </>
}) satisfies FC


function metDonor(): AccordionItem {
  return {
    header: <>
      <div class="with-icon">
        <span class="icon" dangerouslySetInnerHTML={{ __html: svgPerson }}></span>
        <h2>Met a Donor</h2>
      </div>
    </>,
    body: <>
      <form class="form-card bg-white">
        <div class="title has-icon">
          <span class="icon" dangerouslySetInnerHTML={{ __html: svgPerson }}></span>
          <span>Met a Donor</span>
        </div>

        <div class="two">
          <Field type="text" label="First Name *" name="firstName" prefix="met-donor" />
          <Field type="text" label="Last Name" name="lastName" prefix="met-donor" />
        </div>

        <Field type="text" label="Organization" name="organization" prefix="met-donor" placeholder="California Employment Training Panel" />
        <Field type="email" label="Email *" name="email" prefix="met-donor" placeholder="e.vance@california.gov" />
        <Field type="text" label="Address" name="address" prefix="met-donor" placeholder="369 Chestnut Street, Mt. Shasta, CA 96067" />
        <Field type="select" label="Type *" name="type" options={enumDonorTypes.array.map(v => ({ value: String(v.id), label: v.label }))} prefix="met-donor" />
        <Field type="textarea" label="Notes" name="notes" prefix="met-donor" placeholder="Met during Regional Timber Framing Expo & they're interested in subsidizing tools" />
        <button type="submit" class="primary">Save Donor</button>
      </form>
    </>
  }
}


function donationReceived(): AccordionItem {
  return {
    header: <>
      <div class="with-icon">
        <span class="icon" dangerouslySetInnerHTML={{ __html: svgMoney }}></span>
        <h2>Received a Donation</h2>
      </div>
    </>,
    body: <>
      <form class="form-card bg-white">
        <div class="title has-icon">
          <span class="icon" dangerouslySetInnerHTML={{ __html: svgMoney }}></span>
          <span>Received a Donation</span>
        </div>

        <Field type="select" label="Donor *" name="type" options={examples} prefix="donation-received" />
        <Field type="number" label="Amount ($ USD) *" name="amount" prefix="donation-received" />
        <Field type="select" label="Fund *" name="fund" options={enumFunds.array.map(v => ({ value: String(v.id), label: v.label }))} prefix="donation-received" />
        <Field type="datetime-local" label="Date & Time Received *" name="dateReceived" prefix="donation-received" now={true} />

        <button type="submit" class="primary">Save Donation</button>
      </form>
    </>
  }
}


function pledgeReceived(): AccordionItem {
  return {
    header: <>
      <div class="with-icon">
        <span class="icon" dangerouslySetInnerHTML={{ __html: svgHandshake }}></span>
        <h2>Received a Pledge</h2>
      </div>
    </>,
    body: <>
      <form class="form-card bg-white">
        <div class="title has-icon">
          <span class="icon" dangerouslySetInnerHTML={{ __html: svgHandshake }}></span>
          <span>Received a Pledge</span>
        </div>

        <Field type="select" label="Donor *" name="type" options={examples} prefix="pledge-received" />
        <Field type="select" label="Frequency *" name="type" options={enumPledgeFrequencies.array.map(v => ({ value: String(v.id), label: v.label }))} prefix="pledge-received" />
        <Field type="number" label="Frequency Quantity *" name="amount" prefix="pledge-received" />
        <Field type="number" label="Amount @ Each Frequency ($ USD) *" name="amount" prefix="pledge-received" />
        <Field type="select" label="Fund *" name="fund" options={enumFunds.array.map(v => ({ value: String(v.id), label: v.label }))} prefix="pledge-received" />
        <Field type="textarea" label="Notes" name="notes" prefix="pledge-received" placeholder="Pay $5k when we've completed three jobs for low or medium income families" />
        <button type="submit" class="primary">Save Pledge</button>
      </form>
    </>
  }
}


function pledgePaymentReceived(): AccordionItem {
  return {
    header: <>
      <div class="with-icon">
        <span class="icon" dangerouslySetInnerHTML={{ __html: svgCheck }}></span>
        <h2>Received a Pledge Payment</h2>
      </div>
    </>,
    body: <>
      <form class="form-card bg-white">
        <div class="title has-icon">
          <span class="icon" dangerouslySetInnerHTML={{ __html: svgCheck }}></span>
          <span>Received a Pledge Payment</span>
        </div>

        <Field type="select" label="Pledge *" name="type" options={examples} prefix="pledge-payment-received" />
        <Field type="number" label="Amount ($ USD) *" name="amount" prefix="pledge-payment-received" />
        <Field type="datetime-local" label="Date & Time Received *" name="dateReceived" now={true} prefix="pledge-payment-received" />
        <Field type="select" label="Fund *" name="fund" options={enumFunds.array.map(v => ({ value: String(v.id), label: v.label }))} prefix="pledge-payment-received" />

        <button type="submit" class="primary">Save Payment</button>
      </form>
    </>
  }
}


function foundGrant() {
  return {
    header: <>
      <div class="with-icon">
        <span class="icon" dangerouslySetInnerHTML={{ __html: svgExplore }}></span>
        <h2>Found a Lovely Grant</h2>
      </div>
    </>,
    body: <>
      <form class="form-card bg-white">
        <div class="title has-icon">
          <span class="icon" dangerouslySetInnerHTML={{ __html: svgExplore }}></span>
          <span>Found a Lovely Grant</span>
        </div>

        <Field type="text" label="Organization - Grant Name *" name="organizationAndGrantName" prefix="found-grant" placeholder="COYA - Student's First" />
        <Field type="select" label="Fund *" name="fund" options={enumFunds.array.map(v => ({ value: String(v.id), label: v.label }))} prefix="found-grant" />
        <Field type="datetime-local" label="Submission Due Date & Time" name="submissionDueDateTime" prefix="found-grant" />
        <Field type="number" label="Estimated Amount ($ USD)" name="amount" prefix="found-grant" />
        <Field type="select" label="Fit Score *" name="fund" options={enumGrantFit.array.map(v => ({ value: String(v.id), label: v.label }))} prefix="found-grant" />
        <button type="submit" class="primary">Save Grant</button>
      </form>
    </>
  }
}


function appliedToGrant(): AccordionItem {
  return {
    header: <>
      <div class="with-icon">
        <span class="icon" dangerouslySetInnerHTML={{ __html: svgSend }}></span>
        <h2>Applied to a Grant</h2>
      </div>
    </>,
    body: <>
      <form class="form-card bg-white">
        <div class="title has-icon">
          <span class="icon" dangerouslySetInnerHTML={{ __html: svgSend }}></span>
          <span>Applied to a Grant</span>
        </div>

        <Field type="select" label="Grant *" name="type" options={examples} prefix="applied-to-grant" />
        <Field type="datetime-local" label="Submission Date & Time *" name="submissionDateTime" now={true} prefix="applied-to-grant" />
        <Field type="number" label="Requested Amount ($ USD)" name="amount" prefix="applied-to-grant" />
        <button type="submit" class="primary">Save Application</button>
      </form>
    </>
  }
}


function wonGrant(): AccordionItem {
  return {
    header: <>
      <div class="with-icon">
        <span class="icon" dangerouslySetInnerHTML={{ __html: svgGoldMedal }}></span>
        <h2>Won a Grant</h2>
      </div>
    </>,
    body: <>
      <form class="form-card bg-white">
        <div class="title has-icon">
          <span class="icon" dangerouslySetInnerHTML={{ __html: svgGoldMedal }}></span>
          <span>Won a Grant</span>
        </div>

        <Field type="select" label="Grant *" name="type" options={examples} prefix="won-grant" />
        <Field type="number" label="Awarded Amount ($ USD) *" name="amount" prefix="won-grant" />
        <Field type="select" label="Fund *" name="fund" options={enumFunds.array.map(v => ({ value: String(v.id), label: v.label }))} prefix="won-grant" />
        <Field type="textarea" label="Terms & Deliverables" name="terms" prefix="won-grant" />
        <Field type="textarea" label="Restriction Guidelines" name="restrictions" prefix="won-grant" />
        <Field type="textarea" label="Tranche Schedule" name="trancheSchedule" prefix="won-grant" />
        <button type="submit" class="primary">Save Application</button>
      </form>
    </>
  }
}


function lostGrant(): AccordionItem {
  return {
    header: <>
      <div class="with-icon">
        <span class="icon" dangerouslySetInnerHTML={{ __html: svgCloseWithCircle }}></span>
        <h2>Lost a Grant</h2>
      </div>
    </>,
    body: <>
      <form class="form-card bg-white">
        <div class="title has-icon">
          <span class="icon" dangerouslySetInnerHTML={{ __html: svgCloseWithCircle }}></span>
          <span>Lost a Grant</span>
        </div>

        <Field type="select" label="Grant *" name="type" options={examples} prefix="lost-grant" />
        <Field type="textarea" label="Funder Feedback *" name="feedback" prefix="lost-grant" />
        <Field type="datetime-local" label="Eligible Reapply Date" name="reapplyDateTime" prefix="lost-grant" />
        <button type="submit" class="primary">Save Application</button>
      </form>
    </>
  }
}


const examples = [
  { value: '1', label: 'California Apprenticeship Council' },
  { value: '2', label: 'California High Road Training Partnerships' },
  { value: '3', label: 'California Opportunity Youth Apprenticeship (COYA)' },
  { value: '4', label: 'California Workforce Development' },
  { value: '5', label: 'Lowes Home Improvement Foundation' },
  { value: '6', label: 'The Bank of America Charitable Foundation' },
  { value: '7', label: 'The Chan Zuckerberg Community Fund' },
  { value: '8', label: 'The Lumina Foundation' },
]
