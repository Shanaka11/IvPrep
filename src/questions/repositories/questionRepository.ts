import { db } from "@/db/drizzle";
import { eq, inArray } from "drizzle-orm";

import {
  CreateQuestionDto,
  QuestionTable,
  ReadQuestionDto,
  UpdateQuestionDto,
} from "../models/question";

const createQuestion = async (
  data: CreateQuestionDto[],
): Promise<ReadQuestionDto[]> => {
  const question = await db.insert(QuestionTable).values(data).returning();
  return question;
};

const updateQuestion = async (
  data: UpdateQuestionDto,
): Promise<ReadQuestionDto[]> => {
  const question = await db
    .update(QuestionTable)
    .set(data)
    .where(eq(QuestionTable.id, data.id));

  return question;
};

const deleteQuestion = async (
  ids: UpdateQuestionDto["id"][], // For now assume the filter will always be the id
) => {
  // when deleting just set a flag to inactive and keep the record in the database
  const questions = await db
    .update(QuestionTable)
    .set({ active: false })
    .where(inArray(QuestionTable.id, ids))
    .returning();
  return questions;
};

const readQuestion = async (
  id: number, // For now assume the filter will always be the id
): Promise<ReadQuestionDto[]> => {
  const question = await db
    .select()
    .from(QuestionTable)
    .where(eq(QuestionTable.id, id));
  return question;
};

export const questionRepository = {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  readQuestion,
};

export type IQuestionRepository = typeof questionRepository;
