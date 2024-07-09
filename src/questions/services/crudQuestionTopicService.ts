import { db } from "@/db/drizzle";
import { and, eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { ReadQuestionDto } from "../models/question";
import { QuestionTopicTable } from "../models/questionTopic";
import { ReadTopicDto } from "../models/topic";

// Create
export const connectQuestionToTopicService = async (
  questionId: ReadQuestionDto["id"],
  topicId: ReadTopicDto["id"],
  connection: PostgresJsDatabase<Record<string, never>>,
) => {
  const result = await connection
    .insert(QuestionTopicTable)
    .values({
      questionId: questionId,
      topicId: topicId,
    })
    .returning();
  return result;
};

// Delete
export const disconnectQuestionToTopicService = async (
  questionId: ReadQuestionDto["id"],
  topicId: ReadTopicDto["id"],
  connection: PostgresJsDatabase<Record<string, never>>,
) => {
  const result = await connection
    .delete(QuestionTopicTable)
    .where(
      and(
        eq(QuestionTopicTable.questionId, questionId),
        eq(QuestionTopicTable.topicId, topicId),
      ),
    )
    .returning();
  return result;
};
