import { and, eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { CommentTable, ReadCommentDto } from "../models/comment";

export const getCurrentAnswerService = async (
  questionId: ReadCommentDto["questionId"],
  connection: PostgresJsDatabase<Record<string, never>>,
) => {
  const comment = await connection
    .select()
    .from(CommentTable)
    .where(
      and(
        eq(CommentTable.questionId, questionId),
        eq(CommentTable.isAnswer, true),
      ),
    );

  return comment;
};
