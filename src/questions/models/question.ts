import { pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const QuestionTable = pgTable("question", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 256 }).notNull(),
  authorId: uuid("author_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const ReadQuestionSchema = createSelectSchema(QuestionTable);
const CreateQuestionSchema = createInsertSchema(QuestionTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateQuestionDto = z.infer<typeof CreateQuestionSchema>;
export type ReadQuestionDto = z.infer<typeof ReadQuestionSchema>;
