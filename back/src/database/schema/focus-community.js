import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const focusCommunities = pgTable('focus_communities', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(), // Name of the focus area (e.g., 'Binge Eating')
  description: text('description'), // Optional description for the focus area
  createdAt: timestamp('created_at').notNull().defaultNow(), // When the focus area was created
  updatedAt: timestamp('updated_at'),
})
