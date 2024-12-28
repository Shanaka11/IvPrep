import { COMMENT_PAGE_SIZE } from "@/util/consts";
import { asc, desc, eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { CommentTable, ReadCommentDto } from "../models/comment";

// Handle pagination here
export const getCommentsForQuestionService = async (
  questionId: ReadCommentDto["questionId"],
  page: number = -1, // -1 means no pagination
  connection: PostgresJsDatabase<Record<string, never>>,
) => {
  const query = connection
    .select()
    .from(CommentTable)
    .where(eq(CommentTable.questionId, questionId))
    .orderBy(desc(CommentTable.isAnswer), asc(CommentTable.createdAt));
  if (page !== -1) {
    query.limit(COMMENT_PAGE_SIZE).offset((page - 1) * COMMENT_PAGE_SIZE);
  }

  return await query;
};
