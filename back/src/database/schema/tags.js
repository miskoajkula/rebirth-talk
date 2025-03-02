import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull().unique(),
  slug: varchar('slug').notNull().unique(),
  bgColor: varchar('bg_color').notNull(),
  icon: varchar('icon'),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
})
