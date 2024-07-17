"use server";

import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";
import { ReadQuestionDto } from "@/questions/models/question";
import { bulkDeleteQuestionUseCase } from "@/questions/useCases/crudQuestionUseCases";
import { revalidatePath } from "next/cache";

export const deleteQuestionAction = async (questions: ReadQuestionDto[]) => {
  const userId = getAuthenticatedUser();
  const response = await bulkDeleteQuestionUseCase(questions, userId);
  revalidatePath("/questions");
  return response;
};
