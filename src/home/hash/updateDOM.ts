// web/src/home/hash/updateDOM.ts

import { query } from '@hono-dom'
import { enumHomeForms } from '@src/enums/homeForms.enum'


export const defaultHashKey = enumHomeForms.array[0].id


/** "#join-leadership" -> "join-leadership", anything else -> null */
export function parseHash(hash: string): string | null {
  if (!hash || hash === '#') return null
  const id = decodeURIComponent(hash.slice(1))
  return enumHomeForms.has(id) ? id : null
}


export function updateDOM(
  root: HTMLElement,
  activeId: string,
  { scroll = true }: { scroll?: boolean } = {},
) {
  for (const id of enumHomeForms.ids) {
    const form = query<HTMLDivElement>(`#${id}`).root(root).one()
    const anchor = query<HTMLAnchorElement>(`a[href="#${id}"]`).root(root).one()
    const isActive = id === activeId

    form?.classList.toggle('hidden', !isActive)
    anchor?.classList.toggle('orange', isActive)
    anchor?.classList.toggle('transparent', !isActive)

    // Scroll *after* the visibility toggle so the target is laid out.
    if (scroll && isActive) form?.scrollIntoView({ behavior: 'smooth' })
  }
}
