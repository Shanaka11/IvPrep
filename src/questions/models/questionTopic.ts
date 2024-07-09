import { pgTable, serial } from "drizzle-orm/pg-core";

import { QuestionTable } from "./question";
import { TopicTable } from "./topic";

export const QuestionTopicTable = pgTable("question_topic", {
  questionId: serial("question_id")
    .notNull()
    .references(() => QuestionTable.id),
  topicId: serial("topic_id")
    .notNull()
    .references(() => TopicTable.id),
});
