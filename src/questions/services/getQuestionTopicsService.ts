import { and, eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { ReadQuestionDto } from "../models/question";
import { QuestionTopicTable } from "../models/questionTopic";
import { TopicTable } from "../models/topic";

export const getQuestionTopicsService = async (
  questionId: ReadQuestionDto["id"],
  connection: PostgresJsDatabase<Record<string, never>>,
) => {
  const results = await connection
    .select({
      id: TopicTable.id,
      name: TopicTable.name,
      active: TopicTable.active,
      createdAt: TopicTable.createdAt,
      updatedAt: TopicTable.updatedAt,
    })
    .from(TopicTable)
    .innerJoin(
      QuestionTopicTable,
      and(
        eq(TopicTable.id, QuestionTopicTable.topicId),
        eq(QuestionTopicTable.questionId, questionId),
      ),
    )
    .where(eq(TopicTable.active, true));

  return results;
};
