// web/npm/hono-form/src/pipe/array.pipe.ts

import * as v from 'valibot'
import { pipeSelect } from './select.pipe'


/**
 * - Helpul validation for checkboxes when we want to validate an array of requested values against an array of allowed values
 * - Each requested value is validated with {@link pipeSelect}, so values are trimmed before comparison and must match one of the allowed values — otherwise we fail with `props.errorInvalid`
 * - The requested values must contain at least one item - otherwise we fail with `props.errorMissing`
 *
 * @example
  ```ts
  const schema = pipeArray({
    values: ['news', 'sports', 'tech'],
    errorMissing: 'Please provide a tag',
    errorInvalid: 'Please provide valid tags',
  })

  // ['news', 'tech']      → ['news', 'tech']
  // ['news', '  tech  ']  → ['news', 'tech']      (trimmed per element)
  // []                    → errorMissing
  // ['news', 'bogus']     → errorInvalid
  ```
 *
 * @param props.values Allowed values for every element
 * @param props.errorMissing Message reported when provided array is empty (`[]`).
 * @param props.errorInvalid Message reported when a value is not in `values`.
 */
export const pipeArray = <const T extends readonly string[]>(props: {
  errorMissing: string
  errorInvalid: string
  values: T
}) =>
  v.pipe(
    v.array(pipeSelect({ values: props.values, errorMissing: props.errorInvalid, errorInvalid: props.errorInvalid })),
    v.minLength(1, props.errorMissing),
  )
