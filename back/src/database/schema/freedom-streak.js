import { pgTable, timestamp, boolean, integer, serial } from 'drizzle-orm/pg-core'
import { users } from '#database/schema/user.js'

export const freedomStreak = pgTable('freedom_streak', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  endedAt: timestamp('ended_at'),
  updatedAt: timestamp('updated_at'),
  streakCount: integer('streak_count'),
})
