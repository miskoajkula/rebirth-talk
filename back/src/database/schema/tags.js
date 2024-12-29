import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(), // Tag name (e.g., 'Success Story')
  bgColor: text('bg_color').notNull(), // Background color for the tag (e.g., 'bg-green-600')
  icon: text('icon'), // Optional: Icon class or identifier for the tag (e.g., 'BiSolidBadgeCheck')
  description: text('description'), // Optional description of the tag
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
})
