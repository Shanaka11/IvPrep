import {
  boolean,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const QuestionTable = pgTable("question", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 256 }).notNull(),
  authorId: uuid("author_id").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const ReadQuestionSchema = createSelectSchema(QuestionTable);

export const CreateQuestionSchema = createInsertSchema(QuestionTable).omit({
  id: true,
  active: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateQuestionScehma = createInsertSchema(QuestionTable)
  .omit({
    createdAt: true,
  })
  .required({ id: true, updatedAt: true, active: true });

export type CreateQuestionDto = z.infer<typeof CreateQuestionSchema>;
export type UpdateQuestionDto = z.infer<typeof UpdateQuestionScehma>;
export type ReadQuestionDto = z.infer<typeof ReadQuestionSchema>;
