import { pgTable, timestamp, uniqueIndex, varchar, boolean, serial } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 256 }).unique().notNull(),
  password: varchar('password', { length: 256 }),
  username: varchar('username', { length: 256 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  socialAuth: boolean('social_auth').default(false),
  isAdmin: boolean('is_admin').default(false),
  isVerified: boolean('is_verified').default(false),
}, (users) => {
  return  {
    emailUniqueIndex: uniqueIndex('email_unique_idx').on(users.email)
  }
})
