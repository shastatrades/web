// web/src/enums/staff.enum.ts

import { Enum } from '@enum'
import svgMoney from '@src/svg/money.html?raw'
import svgConstruction from '@src/svg/construction.html?raw'


export const enumStaff = new Enum([
  { id: 8, icon: svgConstruction, label: 'Tradesperson', slug: 'tradesperson', description: 'An apprentice guided towards a general contractor license or a licensed mentor ready to aid the next generation' },
  { id: 7, icon: svgMoney, label: 'CFO', slug: 'cfo', description: 'Responsible for our fiscal health, guide our financial decisions and ensure all expenses are mission focused' },
])
