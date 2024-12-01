"use server";

import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";

import { ReadCommentDto } from "../models/comment";
import { updateCommentUseCase } from "../useCases/crudCommentUseCases";

export const updateCommentAction = async (comment: ReadCommentDto) => {
  const userId = getAuthenticatedUser();
  return updateCommentUseCase(comment, userId);
};
