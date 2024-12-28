import { db } from "@/db/drizzle";
import { getQuestionByIdUseCase } from "@/questions/useCases/crudQuestionUseCases";

import { ReadCommentDto } from "../models/comment";
import { getCurrentAnswerService } from "../services/getCurrentAnswerService";
import {
  getCommentByIdUseCase,
  updateCommentUseCase,
} from "./crudCommentUseCases";

export const markCommentAsAnswerUseCase = async (
  commentId: ReadCommentDto["id"],
  userId: string,
  connection = db,
  getCommentById = getCommentByIdUseCase,
  getQuestionById = getQuestionByIdUseCase,
  updateComment = updateCommentUseCase,
  getCurrentAnswer = getCurrentAnswerService,
) => {
  // Only question author can mark a comment as answer
  // Only one comment per question can be marked as answer
  // If the comment is already marked as answer, unmark it
  // If another comment is already marked as answer, unmark it and mark the new comment

  // Get the comment
  const comment = await getCommentById(commentId, connection);
  // Get the question
  const question = await getQuestionById(comment.questionId, connection);
  // Check the author
  if (question.authorId !== userId) {
    throw new Error(
      "Only the author of the question can mark a comment as answer",
    );
  }
  // Check if the comment is already marked as answer
  if (comment.isAnswer) {
    // Unmark and update the comment
    return await updateComment(
      { ...comment, isAnswer: false },
      userId,
      connection,
    );
  }

  // Get the current answer
  const currentAnswer = await getCurrentAnswer(comment.questionId, connection);

  console.log(currentAnswer.length);
  if (currentAnswer.length === 0) {
    // Then this is the correct answer
    return await updateComment(
      { ...comment, isAnswer: true },
      userId,
      connection,
    );
  }

  // Unmark the current answer
  await updateComment(
    { ...currentAnswer[0], isAnswer: false },
    userId,
    connection,
  );
  // Mark the new answer
  return await updateComment(
    { ...comment, isAnswer: true },
    userId,
    connection,
  );
};
