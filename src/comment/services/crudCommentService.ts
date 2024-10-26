import { eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import {
  CommentTable,
  CreateCommentDto,
  ReadCommentDto,
} from "../models/comment";

// Create
export const createCommentService = async (
  comment: ReadCommentDto,
  connection: PostgresJsDatabase<Record<string, never>>,
) => {
  const createdComment = await connection
    .insert(CommentTable)
    .values(comment)
    .returning();

  return createdComment;
};

// Get By Id
export const getCommentByIdService = async (
  id: ReadCommentDto["id"],
  connection: PostgresJsDatabase<Record<string, never>>,
) => {
  const comment = await connection
    .select()
    .from(CommentTable)
    .where(eq(CommentTable.id, id));

  return comment;
};

// Update
export const updateCommentService = async (
  comment: ReadCommentDto,
  connection: PostgresJsDatabase<Record<string, never>>,
) => {
  const updatedComment = await connection
    .update(CommentTable)
    .set(comment)
    .where(eq(CommentTable.id, comment.id))
    .returning();

  return updatedComment;
};

// Delete // We will not archive comments here since there can be a large number of them and no reason to keep them if the users decides to remove them.
export const deleteCommentService = async (
  comment: ReadCommentDto,
  connection: PostgresJsDatabase<Record<string, never>>,
) => {
  const deletedComment = await connection
    .delete(CommentTable)
    .where(eq(CommentTable.id, comment.id))
    .returning();

  return deletedComment;
};

// Get Comments for a question / Handle pagination here if possible
