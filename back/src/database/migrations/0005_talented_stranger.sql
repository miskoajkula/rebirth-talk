ALTER TABLE "tags" ALTER COLUMN "name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "bg_color" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "icon" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "tags" ADD COLUMN "slug" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_slug_unique" UNIQUE("slug");