import { pgTable, timestamp, uniqueIndex, uuid, varchar, integer, boolean, bigint, text, serial } from 'drizzle-orm/pg-core'
import { providers } from './provider.js'
import { categories } from './category.js'
import { sql } from 'drizzle-orm'
import { tags } from '#database/schema/tags.js'
import { focusCommunities } from '#database/schema/focus-community.js'

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('subtitle'),
  slug: varchar('slug', { length: 256 }).notNull(),
  isAnonymous: boolean('is_anonymous').default(false),
  clickCount: bigint('click_count',{ mode: "bigint"}).default(0),
  shareCount: bigint('share_count',{ mode: "bigint"}).default(0),
  likeCount: integer('like_count').default(0),
  commentCount: integer('comment_count').default(0),
  focusCommunityId: integer('focus_community_id').references(() => focusCommunities.id), // The focus area (e.g., Binge Eating)
  tagId: integer('tag_id').references(() => tags.id), // Success story,
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

