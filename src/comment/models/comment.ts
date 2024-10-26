import { QuestionTable } from "@/questions/models/question";
import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const CommentTable = pgTable("comment", {
  id: uuid("id").primaryKey(),
  comment: text("comment").notNull(),
  questionId: serial("question_id")
    .notNull()
    .references(() => QuestionTable.id),
  parentCommentId: uuid("parent_comment_id"),
  isAnswer: boolean("is_answer").notNull().default(false),
  authorId: varchar("author_id", { length: 40 }).notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const ReadCommentSchema = createSelectSchema(CommentTable);
export const CreateCommentSchema = createInsertSchema(CommentTable);

export type CreateCommentDto = Omit<z.infer<typeof ReadCommentSchema>, "id">;
export type ReadCommentDto = z.infer<typeof CreateCommentSchema>;
