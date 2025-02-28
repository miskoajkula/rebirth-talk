CREATE TYPE "public"."role_enum" AS ENUM('user', 'admin', 'moderator');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role_enum" DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "is_admin";