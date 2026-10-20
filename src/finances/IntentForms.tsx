// web/src/finances/IntentForms.tsx

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
import { enumGrantFit } from '@src/enums/grantFit.enum'
import { Accordion, AccordionItem } from '@hono-accordion'
import { enumDonorTypes } from '@src/enums/donorTypes.enum'
import { enumPledgeFrequencies } from '@src/enums/pledgeFrequencies.enum'


export const IntentForms = (() => {
  return <>
    <div data-directive={bindAccordionItems()} class="intent-forms">
      <Accordion items={[
        metDonor(),
        donationReceived(),
        pledgeReceived(),
        pledgePaymentReceived(),
        foundGrant(),
        appliedToGrant(),
      ]} />
    </div>
  </>
}) satisfies FC


function metDonor(): AccordionItem {
  return {
    header: <>
      <div class="with-icon">
        <span class="icon" dangerouslySetInnerHTML={{ __html: svgPerson }}></span>
        <h2>We Met a Donor</h2>
      </div>
    </>,
    body: <>
      <form class="form-card bg-white">
        <div class="title has-icon">
          <span class="icon" dangerouslySetInnerHTML={{ __html: svgPerson }}></span>
          <span>We Met a Donor</span>
        </div>

        <div class="two">
          <Field type="text" label="First Name" name="firstName" prefix="met-donor" />
          <Field type="text" label="Last Name" name="lastName" prefix="met-donor" />
        </div>

        <Field type="text" label="Organization" name="organization" prefix="met-donor" placeholder="California Employment Training Panel" />
        <Field type="email" label="Email" name="email" prefix="met-donor" placeholder="e.vance@california.gov" />
        <Field type="text" label="Address" name="address" prefix="met-donor" placeholder="369 Chestnut Street, Mt. Shasta, CA 96067" />
        <Field type="select" label="Type" name="type" options={enumDonorTypes.array.map(v => ({ value: String(v.id), label: v.label }))} prefix="met-donor" />
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
        <h2>We Received a Donation</h2>
      </div>
    </>,
    body: <>
      <form class="form-card bg-white">
        <div class="title has-icon">
          <span class="icon" dangerouslySetInnerHTML={{ __html: svgMoney }}></span>
          <span>We Received a Donation</span>
        </div>

        <Field type="select" label="Donor" name="type" options={examples} prefix="donation-received" />
        <Field type="number" label="Amount ($ USD)" name="amount" prefix="donation-received" />
        <Field type="datetime-local" label="Date & Time Received" name="dateReceived" prefix="donation-received" />
        <Field type="select" label="Fund" name="fund" options={enumFunds.array.map(v => ({ value: String(v.id), label: v.label }))} prefix="donation-received" />

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
        <h2>We Received a Pledge</h2>
      </div>
    </>,
    body: <>
      <form class="form-card bg-white">
        <div class="title has-icon">
          <span class="icon" dangerouslySetInnerHTML={{ __html: svgHandshake }}></span>
          <span>We Received a Pledge</span>
        </div>

        <Field type="select" label="Donor" name="type" options={examples} prefix="pledge-received" />
        <Field type="select" label="Frequency" name="type" options={enumPledgeFrequencies.array.map(v => ({ value: String(v.id), label: v.label }))} prefix="pledge-received" />
        <Field type="number" label="Frequency Quantity" name="amount" prefix="pledge-received" />
        <Field type="number" label="Amount @ Each Frequency ($ USD)" name="amount" prefix="pledge-received" />
        <Field type="select" label="Fund" name="fund" options={enumFunds.array.map(v => ({ value: String(v.id), label: v.label }))} prefix="pledge-received" />
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
        <h2>We Received a Pledge Payment</h2>
      </div>
    </>,
    body: <>
      <form class="form-card bg-white">
        <div class="title has-icon">
          <span class="icon" dangerouslySetInnerHTML={{ __html: svgCheck }}></span>
          <span>We Received a Pledge Payment</span>
        </div>

        <Field type="select" label="Pledge" name="type" options={examples} prefix="pledge-payment-received" />
        <Field type="number" label="Amount ($ USD)" name="amount" prefix="pledge-payment-received" />
        <Field type="datetime-local" label="Date & Time Received" name="dateReceived" prefix="pledge-payment-received" />
        <Field type="select" label="Fund" name="fund" options={enumFunds.array.map(v => ({ value: String(v.id), label: v.label }))} prefix="pledge-payment-received" />

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
        <h2>We Found a Lovely Grant</h2>
      </div>
    </>,
    body: <>
      <form class="form-card bg-white">
        <div class="title has-icon">
          <span class="icon" dangerouslySetInnerHTML={{ __html: svgExplore }}></span>
          <span>We Found a Lovely Grant</span>
        </div>

        <Field type="text" label="Organization" name="organization" prefix="found-grant" placeholder="California Workforce Development" />
        <Field type="select" label="Fund" name="fund" options={enumFunds.array.map(v => ({ value: String(v.id), label: v.label }))} prefix="found-grant" />
        <Field type="datetime-local" label="Submission Due Date & Time" name="submissionDueDateTime" prefix="found-grant" />
        <Field type="number" label="Estimated Amount ($ USD)" name="amount" prefix="found-grant" />
        <Field type="select" label="Fit Score" name="fund" options={enumGrantFit.array.map(v => ({ value: String(v.id), label: v.label }))} prefix="found-grant" />
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
        <h2>We Applied to a Grant</h2>
      </div>
    </>,
    body: <>
      <form class="form-card bg-white">
        <div class="title has-icon">
          <span class="icon" dangerouslySetInnerHTML={{ __html: svgSend }}></span>
          <span>We Applied to a Grant</span>
        </div>

        <Field type="select" label="Grant" name="type" options={examples} prefix="applied-to-grant" />
        <Field type="datetime-local" label="Submission Date & Time" name="submissionDateTime" prefix="applied-to-grant" />
        <Field type="number" label="Requested Amount ($ USD)" name="amount" prefix="applied-to-grant" />
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
