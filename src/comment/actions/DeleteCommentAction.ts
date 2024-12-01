"use server";

import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";

import { ReadCommentDto } from "../models/comment";
import { deleteCommentUseCase } from "../useCases/crudCommentUseCases";

export const deleteCommentAction = async (comment: ReadCommentDto) => {
  const userId = getAuthenticatedUser();
  return deleteCommentUseCase(comment, userId);
};
