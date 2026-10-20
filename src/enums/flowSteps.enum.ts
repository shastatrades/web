// web/src/enums/flowSteps.enum.ts

import { Enum } from '@enum'
import svgSmile from '@src/svg/smile.html?raw'
import svgPayments from '@src/svg/payments.html?raw'
import svgMenuBook from '@src/svg/menuBook.html?raw'
import svgStarAward from '@src/svg/starAward.html?raw'
import svgPersonAdd from '@src/svg/personAdd.html?raw'
import svgStoreFront from '@src/svg/storeFront.html?raw'
import svgSupervisor from '@src/svg/supervisor.html?raw'
import { enumHomeForms } from '@src/enums/homeForms.enum'
import svgConstruction from '@src/svg/construction.html?raw'
import svgLineMagnifier from '@src/svg/lineMagnifier.html?raw'
import svgToolsClipboard from '@src/svg/toolsClipboard.html?raw'


export const enumFlowSteps = new Enum([
  {
    id: 'community',
    button: 'COMMUNITY',
    steps: [
      {
        icon: svgToolsClipboard,
        title: 'Request a Service',
        description: `Provide a <a href="#${enumHomeForms.obj['service-request'].id}" data-scroll="true">service request</a> that details the work you'd love done`
      },
      {
        icon: svgSmile,
        title: 'Quality at a Discount',
        description: 'Receive lovely results at a discount, thanks to our nonprofit grants'
      },
    ]
  },
  {
    id: 'apprentice',
    button: 'APPRENTICE',
    steps: [
      {
        icon: svgPersonAdd,
        title: 'Apply + Accept',
        description: `Provide your <a href="#${enumHomeForms.obj['join-leadership'].id}" data-scroll="true">application</a> and ace our interview process`
      },
      {
        icon: svgConstruction,
        title: 'Paid to Learn',
        description: 'Receive a salary, experience and guidance from skilled mentors'
      },
      {
        icon: svgMenuBook,
        title: 'Free Study Guide',
        description: `No signing up for a $1,000 course to get a study guide required`
      },
      {
        icon: svgStarAward,
        title: 'Pass State Exam',
        description: `Receive your general contractor's license`
      },
      {
        icon: svgStoreFront,
        title: 'Mentor / Owner',
        description: 'Be a Shasta Trades Mentor and/or start your own Business'
      },
    ]
  },
  {
    id: 'mentor',
    button: 'MENTOR',
    steps: [
      {
        icon: svgPersonAdd,
        title: 'Apply + Accept',
        description: 'Provide your <a href="#join-leadership">application</a> and ace our interview process'
      },
      {
        icon: svgSupervisor,
        title: 'Mentor',
        description: 'Lead projects, share wisdom and earn a competitive salary'
      },
    ]
  },
  {
    id: 'supporter',
    button: 'SUPPORTER',
    steps: [
      {
        icon: svgPayments,
        title: 'Support',
        description: 'Direct your donation to specific cohorts (tools, low income families, etc.)'
      },
      {
        icon: svgLineMagnifier,
        title: 'Impact Analytics',
        description: `Receive detailed, real-time reports, to monitor your contribution's impact`
      },
    ]
  }
])
