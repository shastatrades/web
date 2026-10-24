// web/npm/hono-search/search.ts

import { query } from '@hono-dom'
import { debounce } from '@on-time'
import { safeArrayAccess } from '@safely-access'


/**
 * 1. Adds a debounce to the search function so we only search c.debounceDelay milliseconds after they someone stops typing
 * 2. Attaches debounce search function to `input` listener on search input
 * 3. Attaches click listener to `c.btnClearInput` if provided (clear input, show hidden search items, focus input)
 * 4. IF `c.focusInputOnLoad` THEN focus search input 
 * 5. IF `c.resetOnEscape` THEN on escape press we'll reset the 
 * @returns Debounce search function
 */
export function bindSearch(c: SearchContext) {
  const run = debounce(() => search(c), (c.debounceDelay ?? 120))

  const onInput = () => run()

  const clearInput = () => {
    c.input.value = ''
    onInput()
    c.input.focus()
  }

  c.input.addEventListener('input', onInput)

  c.btnClearInput?.addEventListener('click', clearInput)

  if (c.focusInputOnLoad) {
    c.input.focus()
  }

  if (c.resetOnEscape) {
    c.input.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape' || c.input.value === '') return // IF did not press Escape OR did press escape but no input value THEN no action required
      e.preventDefault() // prevents Escape from also closing a dialog / exiting fullscreen
      clearInput()
    })
  }

  return onInput
}



/**
 * @param props.root Optional, default is `document, the DOM node that we should start our DOM query from to find search items
 * @param props.searchItemsQuery DOM query to find search items
 * @param props.searchItemQuery DOM query to find the item that has the text that we will search
 * @returns Provides optimal data structures for `search()`
 */
export function getSearchItems(props: { searchItemsQuery: string, searchItemQuery: string, root?: HTMLElement }): SearchItem[] {
  const searchItems: SearchItem[] = []

  const elements = query<HTMLElement>(props.searchItemsQuery).root(props.root).all()

  for (let i = 0, len = elements.length; i < len; i++) {
    const elToggleable = safeArrayAccess(elements, i)

    const elSearchable = query<HTMLElement>(props.searchItemQuery).root(elToggleable).one()

    const rawText = (elSearchable.textContent ?? '').replace(/\s+/g, ' ').trim()

    const item: SearchItem = {
      rawText,
      elSearchable,
      elToggleable,
      hidden: false,
      hasMarkNodes: false,
      lowerText: rawText.toLowerCase(),
    }

    searchItems.push(item)
  }

  return searchItems
}



/**
 * Helpful when we'd love to do manual search and skip default behavior provided by {@link bindSearch}
 * @param c {@link SearchContext} provided options for how you'd love the search to function and data strucutres that are optimal for swift search
 * @returns `void`
 */
export function search(c: SearchContext): void {
  const tokens = tokenize(c)

  if (tokens.length === 0) { // IF empty query THEN reset marks + unhide all accordions
    for (const accordion of c.searchItems) {
      if (accordion.hasMarkNodes) {
        resetHeading(accordion)
        accordion.hasMarkNodes = false
      }

      if (accordion.hidden) {
        accordion.elToggleable.classList.remove('hidden')
        accordion.hidden = false
      }
    }

    if (c.onSearch) c.onSearch({ value: c.input.value, tokens, matchCount: 0 })

    return
  }

  const firstAndOnlyToken: string | null = tokens.length === 1 ? safeArrayAccess(tokens, 0) : null // IF there is only one token THEN there is no need to turn the tokens into regex AND we will use .includes() b/c it's a faster search function

  const regex = firstAndOnlyToken ? null : getRegex(c, tokens)

  let matchCount = 0

  for (const accordion of c.searchItems) {
    if (accordion.hasMarkNodes) { // IF we have mark nodes b/c of the previous search THEN clear them
      resetHeading(accordion)
      accordion.hasMarkNodes = false
    }

    const isMatch = firstAndOnlyToken !== null
      ? accordion.lowerText.includes(firstAndOnlyToken) // uno token => isHit if token is w/in accordion header
      : tokens.some((w) => accordion.lowerText.includes(w)) // multiple tokens => isHit on first match

    if (!isMatch) {
      if (!accordion.hidden) {
        accordion.elToggleable.classList.add('hidden')
        accordion.hidden = true
      }

      continue
    }

    matchCount++

    if (accordion.hidden) {
      accordion.elToggleable.classList.remove('hidden')
      accordion.hidden = false
    }

    if (regex) accordion.hasMarkNodes = markWithRegex(accordion, regex)
    else if (firstAndOnlyToken) accordion.hasMarkNodes = markDOM(c, accordion, firstAndOnlyToken)
  }

  if (c.onSearch) c.onSearch({ value: c.input.value, tokens, matchCount })
}



/** convert string query into tokens */
function tokenize(c: SearchContext): string[] {
  /** IF the same word is put into the input twice THEN this seen Set will dedupe */
  const seen = new Set<string>()

  const tokens: string[] = []

  for (const raw of c.input.value.toLowerCase().split(/\s+/)) {
    if (!raw || seen.has(raw)) continue

    seen.add(raw)
    tokens.push(raw)
  }

  /** longest tokens first, so if query is "transaction tr" then we'll mark transaction first and not remark tr on what is already marked but maybe mark a seperate tr */
  return tokens.sort((a, b) => b.length - a.length)
}



function getRegex(c: SearchContext, tokens: string[]): RegExp {
  const key = tokens.join('\u0000') // \u000 = NULL, won't show up in the search input

  const cacheMatch = c.regexCache.get(key)

  if (cacheMatch) { // insertion order is preserved for iteration, helps w/ LRU (Least Recently Used) cache, a reinsert marks this key as fresh
    c.regexCache.delete(key)
    c.regexCache.set(key, cacheMatch)
    return cacheMatch
  }

  /** regex search query, post miss cache match, just puts an or before each token */
  const regex = new RegExp(tokens.map(escapeRegExp).join('|'), 'gi')

  if (c.regexCache.size >= (c.regexCacheMax ?? 63)) {
    c.regexCache.delete(c.regexCache.keys().next().value!) // keys() returns an iterator, .next().value is the first key (the least-recently-used)
  }

  c.regexCache.set(key, regex) // populate cache

  return regex
}



/** 
 * - Every character that would otherwise be interpreted as regex syntax gets a \ in front
 * @returns The resulting string, when fed to new RegExp(...), matches provided literal characters instead of acting as operators
 */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}



/** Restore the <h2> to rawText */
function resetHeading(e: SearchItem): void {
  e.elSearchable.textContent = e.rawText
}



/** Add <mark /> to DOM */
function markDOM(c: SearchContext, accordion: SearchItem, token: string): boolean {
  const textNode = accordion.elSearchable.firstChild as Text | null
  if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return false

  /** helpful for <mark /> slice */
  const value = textNode.nodeValue! // we just checked nodeType === TEXT_NODE, so it's non-null 

  /** helpful for search */
  const lower = value.toLowerCase()

  // assumption being verified: lower[i] corresponds to value[i], which holds only if toLowerCase() is length-preserving
  // IF lowercasing changed the length THEN our index arithmetic is invalid, so hand off to the regex engine, which works on the original string with the i flag and never relies on index alignment
  if (lower.length !== value.length) {
    return markWithRegex(accordion, getRegex(c, [token]))
  }

  // verify we need to <mark /> anythng
  let idx = lower.indexOf(token)
  if (idx === -1) return false

  /** DocumentFragment is DOM detached, appending to it does no DOM calculations */
  const frag = document.createDocumentFragment()

  /** tracks the boundary between written and unwritten */
  let cursor = 0

  do {
    if (idx > cursor) {
      frag.appendChild(document.createTextNode(value.slice(cursor, idx)))
    }

    const mark = document.createElement('mark')

    mark.textContent = value.slice(idx, idx + token.length)
    frag.appendChild(mark)
    cursor = idx + token.length
    idx = lower.indexOf(token, cursor)
  } while (idx !== -1)

  if (cursor < value.length) frag.appendChild(document.createTextNode(value.slice(cursor)))
  textNode.replaceWith(frag)
  return true;
}



/** General path: non-capturing alternation, cached, exec loop (no split). */
function markWithRegex(e: SearchItem, pattern: RegExp): boolean {
  const node = e.elSearchable.firstChild as Text | null
  if (!node || node.nodeType !== Node.TEXT_NODE) return false

  const value = node.nodeValue!
  pattern.lastIndex = 0 // ← mandatory: cached `g` regex carries state

  let m: RegExpExecArray | null
  let cursor = 0
  let frag: DocumentFragment | null = null

  while ((m = pattern.exec(value))) {
    const start = m.index
    const end = start + m[0].length

    if (end === start) { // zero-width safety
      pattern.lastIndex++
      continue
    }

    frag ??= document.createDocumentFragment()

    if (start > cursor) {
      frag.appendChild(document.createTextNode(value.slice(cursor, start)))
    }

    const mark = document.createElement('mark')
    mark.textContent = m[0]
    frag.appendChild(mark)
    cursor = end
  }

  if (!frag) return false
  if (cursor < value.length) frag.appendChild(document.createTextNode(value.slice(cursor)))

  node.replaceWith(frag)

  return true
}



export type SearchContext = {
  /** Turns "compile input.value on every keystroke" into "compile once per unique query, then a Map lookup" */
  regexCache: Map<string, RegExp>,
  /** Optional, default is 63`, `63` is enough to cover a someone's backspace/forward retyping of any realistic query */
  regexCacheMax?: number,
  /** Optional, default is `120`, search() will happen this.debounceDelay ms's after someone stops typing */
  debounceDelay?: number,
  /** Provided by `getSearchItems()` */
  searchItems: SearchItem[],
  /** The DOM input that someone is typing into to get the search to work */
  input: HTMLInputElement,
  /** Optional, IF defined THEN when clicked then we will 1) clear input 2) show all hidden items 3) focus input */
  btnClearInput?: HTMLButtonElement,
  /** Optional, helpful when you'd love to add additional functionality on each search, `value` is the current input value, `tokens` is the parsed input value, `matchCount` is how many search items match the current `tokens` */
  onSearch?: ({ value, tokens, matchCount }: { value: string, tokens: string[], matchCount: number }) => void | Promise<void>
  /** Optional, defaults to false, IF true then we will focus the input on load @ `bindSearch()` */
  focusInputOnLoad?: boolean
  /** Optional, defaults to false, IF true THEN pressing Escape inside `input` will 1) clear the input 2) reset search results 3) focus the input. */
  resetOnEscape?: boolean,
}


type SearchItem = {
  /** DOM item that is show / hidden */
  readonly elToggleable: HTMLElement
  /** the element that is searchable, must not have any elments w/in (only text w/in) */
  readonly elSearchable: HTMLElement
  /** pristine header text (whitespace-collapsed), used to restore <h2> */
  readonly rawText: string
  /** rawText.toLowerCase() */
  readonly lowerText: string
  /** this.h2Heading currently contains <mark> nodes */
  hasMarkNodes: boolean
  /** trackes elAccordion visibility */
  hidden: boolean
}
