import { db } from "@/db/drizzle";
import { and, eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { QuestionTable, ReadQuestionDto } from "../models/question";
import { QuestionTopicTable } from "../models/questionTopic";
import { TopicTable } from "../models/topic";

export const getFullQuestionService = async (
  id: ReadQuestionDto["id"],
  connection: PostgresJsDatabase<Record<string, never>>,
) => {
  const fullQuestion = await connection
    .select()
    .from(QuestionTable)
    .innerJoin(
      QuestionTopicTable,
      eq(QuestionTopicTable.questionId, QuestionTable.id),
    )
    .innerJoin(
      TopicTable,
      and(
        eq(TopicTable.id, QuestionTopicTable.topicId),
        eq(TopicTable.active, true),
      ),
    )
    .where(and(eq(QuestionTable.id, id), eq(QuestionTable.active, true)));
  return fullQuestion;
};
