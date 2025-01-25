import { pgTable, timestamp, uniqueIndex, varchar, boolean, serial, jsonb, pgEnum } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role_enum', ['user', 'admin', 'moderator']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 256 }).unique().notNull(),
  password: varchar('password', { length: 256 }),
  username: varchar('username', { length: 256 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  socialAuth: boolean('social_auth').default(false),
  isVerified: boolean('is_verified').default(false),
  avatar: jsonb('avatar'),
  communities: jsonb('communities'),
  role: roleEnum('role').notNull().default('user'),
}, (users) => {
  return  {
    emailUniqueIndex: uniqueIndex('email_unique_idx').on(users.email)
  }
})
