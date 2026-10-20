// web/npm/enum/index.ts

import { safeArrayAccess, safeObjectAccess } from '@safely-access'


/**
 * ### Provides a typed enum object from an array of `{ id }` items
 * @example
 * ```ts
    const color = new Enum([
      { id: 'red', label: 'Red' },
      { id: 'green', label: 'Green' },
    ])

    color.array // [{ id: 'red', label: 'Red' }, { id: 'green', label: 'Green' }]
    color.ids   // ['red', 'green']

    color.obj.red // { id: 'red', label: 'Red' }   (whole object, exact literal type)
    color.obj.cyan // ❌ type error — 'cyan' isn't a key

    color.has('red')  // true (narrows to 'red' | 'green')
    color.get('red')  // { id: 'red', label: 'Red' }
    color.get('cyan') // undefined
 * ```
 * ### An **optional 2nd argument** names a `keyProp`
 * @example
 * ```ts
    const activity = new Enum([
      { id: 1, label: 'Assignee Added', slug: 'assigneeAdded' },
      { id: 2, label: 'Assignee Removed', slug: 'assigneeRemoved' },
    ], 'slug')

    activity.obj[1]   // { id: 1, label: 'Assignee Added', slug: 'assigneeAdded' }  (whole item)
    activity.slug.assigneeAdded   // { id: 1, label: 'Assignee Added', slug: 'assigneeAdded' }  (whole item)
    activity.slug.someBadSlug     // ❌ type error — 'someBadSlug' isn't a key
 * ```
 *
 * @param source - The source array of items
 * @param keyProp - Optional name of a second, string|number prop to key a nested lookup by
 * @returns An `Enum` object w/ props `array`, `ids`, `obj`, a type-only `$infer`, a narrowing `has` guard by `id`, a `get` lookup by `id`, and (when `keyProp` is passed) a typed object @ `enum[keyProp]`
 */
export const Enum = function (source: readonly EnumItem[], keyProp?: string) { // enum() is reserved in ts AND class constructors can't have const type parameters (only functions can)
  if (keyProp !== undefined && RESERVED_SET.has(keyProp)) {
    throw new Error(`Enum: 2nd arg ${JSON.stringify(keyProp)} collides with a reserved Enum property. Reserved: ${RESERVED_PROPS.join(', ')}`)
  }

  const ids: EnumId[] = []
  const byId = new Map<EnumId, EnumItem>()
  const obj = Object.create(null) as Record<EnumId, EnumItem>

  const keyed = keyProp !== undefined
    ? Object.create(null) as Record<EnumId, EnumItem>
    : undefined

  for (let i = 0; i < source.length; i++) { // single pass: fills ids, byId, obj, keyed simultaneously
    const item = safeArrayAccess(source, i)

    ids.push(item.id)
    byId.set(item.id, item)
    obj[item.id] = item

    if (keyed && keyProp) {
      const key = safeObjectAccess(item, keyProp)

      if (typeof key !== 'string' && typeof key !== 'number') {
        throw new Error(`Enum: item id=${JSON.stringify(item.id)} has no string|number prop ${JSON.stringify(keyProp)} (got ${typeof key})`)
      }

      if (key in keyed) {
        throw new Error(`Enum: duplicate ${JSON.stringify(keyProp)} value ${JSON.stringify(key)} for items ${JSON.stringify(safeObjectAccess(keyed, key).id)} and ${JSON.stringify(item.id)}`)
      }

      keyed[key] = item
    }
  }

  const result: Record<string, unknown> = {
    array: source,
    ids,
    obj,
    $infer: undefined,
    has: (id: EnumId) => byId.has(id),
    get: (id: EnumId) => byId.get(id),
  }

  if (keyed && keyProp) result[keyProp] = keyed

  return result
} as unknown as EnumConstructor



/** Ids may be strings (natural keys) or numbers (SQLite INTEGER PKs, etc.) */
type EnumId = string | number
type EnumItem = { id: EnumId }


/** Prop names that would clash with the Enum object's own props (or are redundant w/ `obj`). */
const RESERVED_PROPS = ['array', 'ids', 'obj', '$infer', 'has', 'get', 'id'] as const
type ReservedProp = typeof RESERVED_PROPS[number]
const RESERVED_SET: ReadonlySet<string> = new Set(RESERVED_PROPS)


/**
 * Valid 2nd-arg prop names: keys present on **every** item, whose value is `string | number`,
 * and which aren't reserved. If the array has no such prop, this is `never` and the 2nd arg
 * cannot be provided.
 */
type EnumKeyProp<T extends readonly EnumItem[]> = Extract<
  {
    [P in keyof T[number]]-?: P extends ReservedProp ? never
    : T[number][P] extends EnumId ? P : never
  }[keyof T[number]],
  string
>

/** Pick the exact item from `T` whose prop `P` equals `V`. */
type ItemBy<T extends readonly EnumItem[], P extends string, V extends EnumId> = Extract<T[number], Record<P, V>>


/** `{ 1: Item1, 2: Item2 }` / `{ red: ItemRed, green: ItemGreen }` — id-keyed lookup. */
type EnumObj<T extends readonly EnumItem[]> = {
  readonly [Id in T[number]['id']]: ItemBy<T, 'id', Id>
}


/** `{ assigneeAdded: Item1, assigneeRemoved: Item2, ... }` — keyed by the 2nd prop's values. */
type EnumKeyed<T extends readonly EnumItem[], K extends EnumKeyProp<T>> = {
  readonly [V in Extract<T[number][K & keyof T[number]], EnumId>]:
  ItemBy<T, K & keyof T[number], V>
}


type EnumConstructor = {
  // `const T` preserves the array literals; `const K` preserves the 2nd-arg literal.
  new <
    const T extends readonly EnumItem[],
    const K extends EnumKeyProp<T> = never
  >(arr: T, keyProp?: K): EnumResult<T, K>
}


type EnumResult<T extends readonly EnumItem[], K extends string = never> = {
  /** The original array exactly as provided */
  readonly array: T
  /** Every id, in order */
  readonly ids: T[number]['id'][]
  /** id → whole item, type-safe dot/bracket access: `colors.obj.red` / `kanban.obj[1]` */
  readonly obj: EnumObj<T>
  /** Type-only phantom — `(typeof x.$infer)['id']` gives the id union */
  readonly $infer: T[number]
  /** Type guard — narrows a `string | number` to the union of ids */
  has(id: EnumId): id is T[number]['id']
  /** Known id → the exact source item (full object, not just the id) */
  get<Id extends T[number]['id']>(id: Id): ItemBy<T, 'id', Id>
  /** Unknown id → the widest item type, or `undefined` */
  get(id: EnumId): T[number] | undefined
} & (
    // Only adds a new prop when the caller actually passed a 2nd arg.
    [K] extends [never]
    ? unknown
    : { readonly [P in K]: EnumKeyed<T, P & EnumKeyProp<T>> }
  )
