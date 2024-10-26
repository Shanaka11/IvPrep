import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const QuestionTable = pgTable("question", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 256 }).notNull(),
  authorId: varchar("author_id", { length: 40 }).notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const ReadQuestionSchema = createSelectSchema(QuestionTable);
export const CreateQuestionSchema = createInsertSchema(QuestionTable);

export type CreateQuestionDto = z.infer<typeof CreateQuestionSchema>;
export type ReadQuestionDto = z.infer<typeof ReadQuestionSchema>;
