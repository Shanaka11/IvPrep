import { db } from "@/db/drizzle";
import { and, eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import {
  CreateQuestionDto,
  QuestionTable,
  ReadQuestionDto,
} from "../models/question";

// Create
export const createQuestionService = async (
  question: CreateQuestionDto,
  connection: PostgresJsDatabase<Record<string, never>>,
): Promise<ReadQuestionDto[]> => {
  const createdQuestion = await connection
    .insert(QuestionTable)
    .values(question)
    .returning();
  return createdQuestion;
};

// Get by id
export const getQuestionByIdService = async (
  id: ReadQuestionDto["id"],
  connection: PostgresJsDatabase<Record<string, never>>,
) => {
  const question = await connection
    .select()
    .from(QuestionTable)
    .where(and(eq(QuestionTable.id, id), eq(QuestionTable.active, true)));

  return question;
};

// Update
export const updateQuestionService = async (
  question: ReadQuestionDto,
  connection: PostgresJsDatabase<Record<string, never>>,
): Promise<ReadQuestionDto[]> => {
  const updatedQuestion = await connection
    .update(QuestionTable)
    .set(question)
    .where(
      and(eq(QuestionTable.id, question.id), eq(QuestionTable.active, true)),
    )
    .returning();

  return updatedQuestion;
};
