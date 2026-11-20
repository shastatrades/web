// web/src/db/lookupColumns.ts

import { integer, text } from 'drizzle-orm/sqlite-core';

export function lookupColumns() {
  return {
    id: integer('id').primaryKey({ autoIncrement: true }),
    value: text('value').notNull().unique(),
    slug: text('slug').notNull().unique(),
    isActive: integer('isActive', { mode: 'boolean' })
      .notNull()
      .default(true),
  } as const
}
