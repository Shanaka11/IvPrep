import { db } from "@/db/drizzle";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import {
  CreateQuestionDto,
  QuestionTable,
  ReadQuestionDto,
} from "../models/question";

// Consider using a wrapper here so we can inject the db instance
// create Question
export const createQuestionService = async (
  data: CreateQuestionDto[],
): Promise<ReadQuestionDto[]> => {
  //   const question = await db.insert(que);
  //   return question;
  return createQuestionService_(db, data);
};

const createQuestionService_ = async (
  db: PostgresJsDatabase<Record<string, never>>,
  data: CreateQuestionDto[],
): Promise<ReadQuestionDto[]> => {
  const question = await db.insert(QuestionTable).values(data).returning();
  return question;
};
