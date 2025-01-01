"use server";

import { getQuestionByIdUseCase } from "@/questions/useCases/crudQuestionUseCases";

export const getQuestionByIdAction = async (questionId: number) => {
  return await getQuestionByIdUseCase(questionId);
};
