import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";
import { db } from "@/db/drizzle";
import { generateId } from "@/lib/generateId";
import { getQuestionByIdService } from "@/questions/services/crudQuestionService";
import { getQuestionByIdUseCase } from "@/questions/useCases/crudQuestionUseCases";
import { parseZodErrors } from "@/util/zodErrorHandler";
import { ZodError } from "zod";

import {
  CreateCommentDto,
  CreateCommentSchema,
  ReadCommentDto,
  ReadCommentSchema,
} from "../models/comment";
import {
  createCommentService,
  deleteCommentService,
  getCommentByIdService,
  updateCommentService,
} from "../services/crudCommentService";

// Create
export const createCommentUseCase = async (
  comment: CreateCommentDto,
  userId: string,
  connection = db,
  createComment = createCommentService,
  getQuestionById = getQuestionByIdService,
) => {
  try {
    // Generate the id using a uuid generator
    // Validate the comment
    const validatedComment = CreateCommentSchema.parse({
      id: generateId(),
      ...comment,
    });
    // Check if a question exist for the given comments question id
    await getQuestionByIdUseCase(comment.questionId, db, getQuestionById);
    // Set the created at and updated at fields
    validatedComment.createdAt = new Date();
    validatedComment.updatedAt = validatedComment.createdAt;
    // Set the active field to true
    validatedComment.active = true;
    // Create the comment
    const createdComment = await createComment(
      {
        id: validatedComment.id,
        comment: validatedComment.comment,
        questionId: validatedComment.questionId,
        isAnswer: validatedComment.isAnswer || false,
        authorId: userId,
        createdAt: validatedComment.createdAt,
        updatedAt: validatedComment.updatedAt,
        active: true,
      },
      connection,
    );
    // Return the created comment
    if (createdComment.length === 0)
      throw new Error("Failed to create comment");
    return createdComment[0];
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw parseZodErrors(error);
    }
    throw error;
  }
};
// Get By Id
export const getCommentByIdUseCase = async (
  id: ReadCommentDto["id"],
  connection = db,
  getCommentById = getCommentByIdService,
) => {
  try {
    const comment = await getCommentById(id, connection);
    if (comment.length === 0) throw new Error("Comment not found");
    return comment[0];
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw parseZodErrors(error);
    }
    throw error;
  }
};
// Update
export const updateCommentUseCase = async (
  comment: ReadCommentDto,
  userId: string,
  connection = db,
  updateComment = updateCommentService,
) => {
  try {
    // Validate the comment
    const validatedComment = ReadCommentSchema.parse(comment);

    // Check if the user is same as the auther of the comment or the auther of the question
    if (validatedComment.authorId !== userId)
      throw new Error(
        "You are not allowed to update this comment, Only the author of the comment can update the comment",
      );
    // Get the old comment
    const oldComment = await getCommentByIdUseCase(
      validatedComment.id,
      connection,
    );
    // Check if the comment has been updated by someone else
    if (oldComment.updatedAt.getTime() !== validatedComment.updatedAt.getTime())
      throw new Error("Comment has been updated by someone else");

    // Check if not updatable fields are updated
    if (oldComment.authorId !== validatedComment.authorId) {
      throw new Error(
        "You are not allowed to update the author id of the comment",
      );
    }
    if (oldComment.questionId !== validatedComment.questionId) {
      throw new Error(
        "You are not allowed to update the question id of the comment",
      );
    }
    if (
      oldComment.createdAt.getTime() !== validatedComment.createdAt.getTime()
    ) {
      throw new Error(
        "You are not allowed to update the created at field of the comment",
      );
    }
    // Set the updated at field
    validatedComment.updatedAt = new Date();
    // Update the comment
    const updatedComment = await updateComment(validatedComment, connection);
    // Return the updated comment
    if (updatedComment.length === 0)
      throw new Error("Failed to update comment");
    return updatedComment[0];
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw parseZodErrors(error);
    }
    throw error;
  }
};

// Delete
export const deleteCommentUseCase = async (
  comment: ReadCommentDto,
  userId: string,
  connection = db,
  deleteComment = deleteCommentService,
) => {
  try {
    // Validate the comment
    const validatedComment = ReadCommentSchema.parse(comment);
    // Get the old comment
    const oldComment = await getCommentByIdUseCase(
      validatedComment.id,
      connection,
    );
    // Check if the comment has been updated by someone else
    if (oldComment.updatedAt.getTime() !== validatedComment.updatedAt.getTime())
      throw new Error("Comment has been updated by someone else");

    // Get the question connected to the comment
    const question = await getQuestionByIdUseCase(
      validatedComment.questionId,
      connection,
    );
    // Check if the user is same as the auther of the comment or the auther of the question
    if (validatedComment.authorId !== userId && question.authorId !== userId)
      throw new Error(
        "You are not allowed to delete this comment, Only the author of the comment or the author of the question can delete the comment",
      );
    // Delete the comment
    const deletedComment = await deleteComment(validatedComment, connection);
    // Return the deleted comment
    if (deletedComment.length === 0)
      throw new Error("Failed to delete comment");
    return deletedComment[0];
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw parseZodErrors(error);
    }
    throw error;
  }
};
