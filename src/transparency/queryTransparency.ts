// web/src/transparency/queryTransparency.ts

import { md2html } from '@src/md/md2html'
import { enumTransparencyMarkdowns } from '@src/enums/transparencyMarkdowns.enum'


export async function queryTransparency(id?: string) {
  const verifiedMarkdown = id
    ? enumTransparencyMarkdowns.get(id) ?? enumTransparencyMarkdowns.array[0]
    : enumTransparencyMarkdowns.array[0]

  const html = await getHtml(verifiedMarkdown)

  return {
    html,
    title: verifiedMarkdown.title,
    verifiedId: verifiedMarkdown.id,
  }
}


async function getHtml(doc: typeof enumTransparencyMarkdowns.$infer) {
  return typeof doc.md === 'string'
    ? await md2html(doc.md, doc)
    : (await Promise.all(doc.md.map(async md => await md2html(md, doc)))).join('')
}
