CREATE TABLE IF NOT EXISTS "comment" (
	"id" uuid PRIMARY KEY NOT NULL,
	"comment" text NOT NULL,
	"question_id" integer NOT NULL,
	"is_answer" boolean DEFAULT false NOT NULL,
	"author_id" varchar(40) NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
