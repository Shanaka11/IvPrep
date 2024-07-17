"use server";

import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";
import { getUserQuestionsUseCase } from "@/questions/useCases/getUserQuestionsUseCase";

export const getUserQuestionsAction = async () => {
  const userId = getAuthenticatedUser();
  const questions = await getUserQuestionsUseCase(userId);
  return questions;
};
