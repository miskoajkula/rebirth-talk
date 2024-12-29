import { pgTable, timestamp, text, integer, serial, varchar } from 'drizzle-orm/pg-core'
import { users } from '#database/schema/user.js'

export const journal = pgTable('journal', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
  title: varchar('mood', { length: 256 }),
  content: text('content').notNull(),
  tags: text('tags[]'),
})
