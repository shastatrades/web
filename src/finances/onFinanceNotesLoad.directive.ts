// web/src/finances/onFinanceNotesLoad.directive.ts


import { query } from '@hono-dom'
import { idNoResults } from '@src/lib/dom'
import { bindSearch, getSearchItems } from '@hono-search'


export default (el: HTMLDivElement) => {
  const hrs = query<HTMLHRElement>('hr').all()
  const divNoSearchResults = query<HTMLDivElement>(idNoResults().query).one()

  const searchItems = getSearchItems({
    searchItemsQuery: '.accordion-item',
    searchItemQuery: '.accordion-title h2',
  })

  bindSearch({
    searchItems,
    resetOnEscape: true,
    regexCache: new Map(),
    focusInputOnLoad: true,
    input: query<HTMLInputElement>('input').root(el).one(),
    btnClearInput: query<HTMLButtonElement>('button').root(el).one(),
    onSearch ({ value, matchCount }) {
      if (value) hrs.forEach(hr => hr.classList.add('hidden'))
      else hrs.forEach(hr => hr.classList.remove('hidden'))

      divNoSearchResults.classList.toggle('hidden', matchCount !== 0)
    }
  })
}
