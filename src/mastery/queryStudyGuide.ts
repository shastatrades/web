// web/src/mastery/queryStudyGuide.ts

import { md2html } from '@src/md/md2html'
import { enumStudyGuideSections } from '@src/enums/studyGuideSections.enum'


export async function queryStudyGuide(id?: string) {
  const verifiedId = id && enumStudyGuideSections.has(id)
    ? id
    : enumStudyGuideSections.array[0].id

  const md = await import(`./studyGuide2025_${verifiedId}.md?raw`)

  return {
    verifiedId,
    html: await md2html(md.default, { wrapTables: false, enableAccordion: true })
  }
}
