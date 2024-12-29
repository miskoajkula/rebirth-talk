import { pgTable, serial, text, timestamp, integer, varchar } from 'drizzle-orm/pg-core'

export const dailyQuotes = pgTable('daily_quote', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(), // The quote text
  author: varchar('author', { length: 256 }),
  createdAt: timestamp('created_at').notNull().defaultNow(), // When the quote was added
  updatedAt: timestamp('updated_at'),
  dayOfYear: integer('day_of_year').notNull(), // Links the quote to a specific day (1-365/366)
})
