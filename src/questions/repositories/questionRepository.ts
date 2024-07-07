import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

import {
  CreateQuestionDto,
  QuestionTable,
  ReadQuestionDto,
  UpdateQuestionDto,
} from "../models/question";

const createQuestionRepository = async (
  data: CreateQuestionDto[],
): Promise<ReadQuestionDto[]> => {
  const question = await db.insert(QuestionTable).values(data).returning();
  return question;
};

const updateQuestionRepository = async (
  data: UpdateQuestionDto[],
): Promise<ReadQuestionDto[]> => {
  const question = await Promise.all(
    data.map(async (dataItem) => {
      const updatedQuestion = await db
        .update(QuestionTable)
        .set(dataItem)
        .where(eq(QuestionTable.id, dataItem.id));
      return updatedQuestion;
    }),
  );
  return question.flat();
};

export const questionRepository = {
  createQuestionRepository,
  updateQuestionRepository,
};

export type IQuestionRepository = typeof questionRepository;
