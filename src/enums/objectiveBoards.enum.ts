// web/src/enums/objectiveBoards.enum.ts

import { Enum } from '@enum'

export const enumObjectiveBoards = new Enum([
  { id: 1, value: 'Q3 2026', slug: 'q3-2026', isActive: true, isCurrent: false },
  { id: 2, value: 'Q4 2026', slug: 'q4-2026', isActive: true, isCurrent: true },
], 'slug')

export const objectiveBoardSlugs = enumObjectiveBoards.array.map(v => v.slug)

export const currentObjectiveBoard = enumObjectiveBoards.slug['q4-2026']
