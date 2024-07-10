import { and, eq, inArray } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { QuestionTable } from "../models/question";
import { QuestionTopicTable } from "../models/questionTopic";
import { ReadTopicDto, TopicTable } from "../models/topic";
import { formatFullQuestionDrizzle } from "./utils/formatFullQuestionDrizzle";

export const getQuestionsForTopicsService = async (
  ids: ReadTopicDto["id"][],
  connection: PostgresJsDatabase<Record<string, never>>,
) => {
  const results = await connection
    .select()
    .from(QuestionTable)
    .innerJoin(
      QuestionTopicTable,
      and(
        eq(QuestionTopicTable.questionId, QuestionTable.id),
        inArray(QuestionTopicTable.topicId, ids),
      ),
    )
    .innerJoin(TopicTable, eq(TopicTable.id, QuestionTopicTable.topicId))
    .where(and(eq(QuestionTable.active, true), eq(TopicTable.active, true)))
    .orderBy(QuestionTable.id);

  // transform the response to a more readable format
  return formatFullQuestionDrizzle(results);
};
