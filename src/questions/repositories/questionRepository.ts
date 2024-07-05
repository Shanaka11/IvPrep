import { db } from "@/db/drizzle";

import {
  CreateQuestionDto,
  QuestionTable,
  ReadQuestionDto,
} from "../models/question";

const createQuestionRepository = async (
  data: CreateQuestionDto[],
): Promise<ReadQuestionDto[]> => {
  const question = await db.insert(QuestionTable).values(data).returning();
  return question;
};

export const questionRepository = {
  createQuestionRepository,
};

export type IQuestionRepository = typeof questionRepository;
