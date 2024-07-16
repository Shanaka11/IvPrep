import { and, eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { QuestionTable, ReadQuestionDto } from "../models/question";
import { QuestionTopicTable } from "../models/questionTopic";
import { TopicTable } from "../models/topic";
import { formatFullQuestionDrizzle } from "./utils/formatFullQuestionDrizzle";

export const getFullQuestionService = async (
  id: ReadQuestionDto["id"],
  connection: PostgresJsDatabase<Record<string, never>>,
) => {
  const results = await connection
    .select()
    .from(QuestionTable)
    .leftJoin(
      QuestionTopicTable,
      eq(QuestionTopicTable.questionId, QuestionTable.id),
    )
    .leftJoin(
      TopicTable,
      and(
        eq(TopicTable.id, QuestionTopicTable.topicId),
        eq(TopicTable.active, true),
      ),
    )
    .where(and(eq(QuestionTable.id, id), eq(QuestionTable.active, true)));

  return formatFullQuestionDrizzle(results);
};
