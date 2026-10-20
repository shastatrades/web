// web/src/enums/masteryMarkdowns.enum.ts

import { Enum } from '@enum'
import mdStudyGuide2025Faq from '@src/mastery/studyGuide2025Faq.md?raw'
import mdYoutubeUniversity from '@src/mastery/youtubeUniversity.md?raw'


export const enumMasteryMarkdowns = new Enum([
  { id: 'youtube-university', title: 'Youtube University', md: mdYoutubeUniversity, wrapTables: false, enableAccordion: true },
  { id: '2025-class-b-study-guide', title: '2025 Class B Study Guide', md: mdStudyGuide2025Faq, wrapTables: false, enableAccordion: true },
])
