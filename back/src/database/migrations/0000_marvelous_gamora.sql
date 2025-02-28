CREATE TABLE IF NOT EXISTS "daily_quote" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"author" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"day_of_year" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "focus_communities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "focus_communities_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "freedom_streak" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"ended_at" timestamp,
	"updated_at" timestamp,
	"streak_count" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "journal" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"mood" varchar(256),
	"content" text NOT NULL,
	"tags[]" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"subtitle" text,
	"slug" varchar(256) NOT NULL,
	"is_anonymous" boolean DEFAULT false,
	"click_count" bigint DEFAULT 0,
	"share_count" bigint DEFAULT 0,
	"like_count" integer DEFAULT 0,
	"comment_count" integer DEFAULT 0,
	"focus_community_id" integer,
	"tag_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"bg_color" text NOT NULL,
	"icon" text,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256),
	"username" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"social_auth" boolean DEFAULT false,
	"is_admin" boolean DEFAULT false,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "freedom_streak" ADD CONSTRAINT "freedom_streak_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "journal" ADD CONSTRAINT "journal_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_focus_community_id_focus_communities_id_fk" FOREIGN KEY ("focus_community_id") REFERENCES "public"."focus_communities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_unique_idx" ON "users" USING btree ("email");