import { pgTable, serial, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core'

export const focusCommunities = pgTable('focus_communities', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'), // Optional description
  parentId: integer('parent_id'), // Self-reference: null for top-level categories, populated for subcategories
  icon: text('icon'), // Icon name (only populated for parent categories)
  preselect: boolean('preselect').default(false), // Whether this category is preselected (only relevant for parent categories)
  isCategory: boolean('is_category').notNull().default(false), // Flag to easily distinguish categories from subcategories
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
})
