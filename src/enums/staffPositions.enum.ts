// web/src/enums/staffPositions.enum.ts

import { Enum } from '@enum'
import svgMoney from '@src/svg/money.html?raw'
import svgConstruction from '@src/svg/construction.html?raw'

export const enumStaffPositions = new Enum([
  { id: 1, value: 'Co-founder', slug: 'coFounder', isHiring: false },
  { id: 2, value: 'Trustee', slug: 'trustee', isHiring: false },
  { id: 3, value: 'President', slug: 'president', isHiring: false },
  { id: 4, value: 'Secretary', slug: 'secretary', isHiring: false },
  { id: 5, value: 'Treasurer', slug: 'treasurer', isHiring: false },
  { id: 6, value: 'Executitve Director', slug: 'executitveDirector', isHiring: false },
  { id: 7, value: 'CTO', slug: 'cto', isHiring: false },
  { id: 8, value: 'CFO', slug: 'cfo', isHiring: true, icon: svgMoney, description: 'Responsible for our fiscal health, guide our financial decisions and ensure all expenses are mission focused' },
  { id: 9, value: 'Tradesperson', slug: 'tradesperson', isHiring: true, icon: svgConstruction, description: 'An apprentice guided towards a general contractor license or a licensed mentor ready to aid the next generation' },
  { id: 10, value: 'Zoom Mentor', slug: 'zoomMentor', isHiring: false },
  { id: 11, value: 'Study Guide Maintainer', slug: 'studyGuideMaintainer', isHiring: false },
], 'slug')

export const hiringStaffPositions = enumStaffPositions.array.filter(v => v.isHiring === true)
