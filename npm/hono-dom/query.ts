// web/npm/hono-dom/query.ts

/** 
 * - Helpful when we know an element is in the DOM and we'd love to access it 
 * - We will do the IF element is truthy check and throw an error if the DOM item is not present
 */
export function query<T_Element extends HTMLElement>(query: string): QueryReturn<T_Element> {
  return new QueryReturn<T_Element>(query)
}


export class QueryReturn<T_Element extends HTMLElement> {
  #root: HTMLElement | Document = document
  #query: string

  constructor(query: string) {
    this.#query = query
  }

  /** Set the root element. */
  root(el: HTMLElement | Document = document): this {
    this.#root = el
    return this
  }

  /** Get first match. */
  one(): T_Element {
    const el = this.#root.querySelector<T_Element>(this.#query)
    if (!el) throw new Error('❌ Not found: ' + this.#query)
    return el
  }

  /** Get all matches. */
  all(): NodeListOf<T_Element> {
    const list = this.#root.querySelectorAll<T_Element>(this.#query)
    if (!list.length) throw new Error('❌ Not found: ' + this.#query)
    return list
  }
}
