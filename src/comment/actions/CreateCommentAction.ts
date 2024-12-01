"use server";

import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";

import { CreateCommentDto } from "../models/comment";
import { createCommentUseCase } from "../useCases/crudCommentUseCases";

export const createCommentAction = async (comment: CreateCommentDto) => {
  const userId = getAuthenticatedUser();
  return createCommentUseCase(comment, userId);
};
