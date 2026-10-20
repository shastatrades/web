// web/npm/hono-form/src/pipe/select.pipe.ts

import * as v from 'valibot'


export function pipeSelect<const T extends readonly string[]>( // overload: optional is true
  props: SelectPipeProps<T> & { optional: true },
): OptionalSchema<T>


export function pipeSelect<const T extends readonly string[]>( // overload: optional is false or undefined
  props: SelectPipeProps<T> & { optional?: false },
): RequiredSchema<T>


/**
 * - Helpul validation for select dropdowns when we want to validate a value against an array of allowed values
 * - Each requested value is trimmed before comparison and must match one of the allowed values — otherwise we fail with `props.errorInvalid`
 * - When `props.optional` is falsy, the requested values must be truthy - otherwise we fail with `props.errorMissing`
 *
 * @example
  ```ts
  const schema = pipeSelect({
    values: ['admin', 'guest'],
    errorMissing: 'Please provide a role',
    errorInvalid: 'Please provide a valid role',
  })

  // "admin"     → "admin"
  // "  admin  " → "admin"      (trimmed)
  // ""          → errorMissing
  // "hacker"    → errorInvalid
  ```
 *
 * @example
  ```ts
  const schema = pipeSelect({
    optional: true,
    values: ['admin', 'guest'],
    errorInvalid: 'Please provide a valid role',
  })

  // undefined → undefined
  // "admin"   → "admin"
  // "hacker"  → errorInvalid
  ```
 *
 * @param props.values Allowed values
 * @param props.errorInvalid Message reported when the value is not in `values`.
 * @param props.errorMissing Message reported when a required value is empty. Omit when `props.optional` is `true`
 * @param props.optional IF `true` THEN the requested value can be `undefined`
 */
export function pipeSelect(
  props: SelectPipeProps<readonly string[]>,
): unknown {
  const picklistStep = v.picklist(props.values, props.errorInvalid)

  if (props.optional === true) {
    return v.optional(v.pipe(v.string(), v.trim(), picklistStep))
  }

  return v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, props.errorMissing),
    picklistStep,
  )
}



/** schema builders (defined as values so we can derive their types) */
const requiredPicklist = <const T extends readonly string[]>(
  values: T,
  errorMissing: string,
  errorInvalid: string,
) =>
  v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, errorMissing),
    v.picklist(values, errorInvalid),
  )



type RequiredSchema<T extends readonly string[]> = ReturnType<typeof requiredPicklist<T>>

type OptionalSchema<T extends readonly string[]> = v.OptionalSchema<RequiredSchema<T>, undefined>


type SelectBase<T extends readonly string[]> = {
  values: T
  errorInvalid: string
}

type SelectPipeProps<T extends readonly string[]> = SelectBase<T> & (
  | { optional: true; errorMissing?: never }
  | { optional?: false; errorMissing: string }
)
