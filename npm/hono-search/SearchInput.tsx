// web/npm/hono-search/SearchInput.tsx

import type { FC } from 'hono/jsx'


/**
 * @param props.svgSearch Search [icon svg](https://icones.js.org/collection/all) string
 * @param props.svgClose Close [icon svg](https://icones.js.org/collection/all) string
 * @param props.placeholder Optional, default is an empty string, input placeholder
 * @param props.name Optional, default is `search-input`, the `<input />` name property
 * @param props.type Optional, default is `text`, the `<input />` type property
 */
export default ((props) => {
  return <>
    <div class="search-input">
      <span dangerouslySetInnerHTML={{ __html: props.svgSearch }}></span>
      <input type={props.type ?? 'text'} name={props.name ?? 'search-input'} placeholder={props.placeholder ?? ''} />
      <button class="close" type="button" dangerouslySetInnerHTML={{ __html: props.svgClose }} />
    </div>
  </>
}) satisfies FC<{ svgSearch: string, svgClose: string, name?: string, type?: string, placeholder?: string }>
