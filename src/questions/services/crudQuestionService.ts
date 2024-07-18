import { db } from "@/db/drizzle";
import { and, eq, ilike, inArray } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import {
  CreateQuestionDto,
  QuestionTable,
  ReadQuestionDto,
} from "../models/question";
import { QuestionTopicTable } from "../models/questionTopic";

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

// Get all questions

export const getAllQuestionsService = async (
  autherId: ReadQuestionDto["authorId"] | null,
  searchString: string | null,
  topicIds: ReadQuestionDto["id"][] | null,
  connection: PostgresJsDatabase<Record<string, never>>,
) => {
  const query = connection
    .selectDistinctOn([QuestionTable.id], {
      id: QuestionTable.id,
      question: QuestionTable.question,
      authorId: QuestionTable.authorId,
      active: QuestionTable.active,
      createdAt: QuestionTable.createdAt,
      updatedAt: QuestionTable.updatedAt,
    })
    .from(QuestionTable)
    .where(eq(QuestionTable.active, true))
    .orderBy(QuestionTable.id);

  if (autherId !== null && searchString !== null) {
    query
      .$dynamic()
      .where(
        and(
          eq(QuestionTable.active, true),
          eq(QuestionTable.authorId, autherId),
          ilike(QuestionTable.question, `%${searchString}%`),
        ),
      );
  }

  if (autherId !== null && searchString === null) {
    query
      .$dynamic()
      .where(
        and(
          eq(QuestionTable.active, true),
          eq(QuestionTable.authorId, autherId),
        ),
      );
  }

  if (autherId === null && searchString !== null) {
    query
      .$dynamic()
      .where(
        and(
          eq(QuestionTable.active, true),
          ilike(QuestionTable.question, `%${searchString}%`),
        ),
      );
  }

  if (topicIds !== null) {
    query
      .$dynamic()
      .innerJoin(
        QuestionTopicTable,
        and(
          eq(QuestionTable.id, QuestionTopicTable.questionId),
          inArray(QuestionTopicTable.topicId, topicIds),
        ),
      );
  }

  return await query;
};
