"use server";

import { getCommentsForQuestionUseCase } from "../useCases/getCommentsForQuestionUseCase";

export const GetCommentsForQuestionAction = async (questionId: number) => {
  return getCommentsForQuestionUseCase(questionId);
};
