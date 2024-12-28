"use server";

import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";

import { ReadCommentDto } from "../models/comment";
import { markCommentAsAnswerUseCase } from "../useCases/markCommentAsAnswerUseCase";

export const markCommentAsAnswerAction = async (
  commentId: ReadCommentDto["id"],
) => {
  const userId = getAuthenticatedUser();
  await markCommentAsAnswerUseCase(commentId, userId);
};
