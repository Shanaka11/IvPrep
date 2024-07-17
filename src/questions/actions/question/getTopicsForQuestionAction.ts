"use server";

import { ReadQuestionDto } from "@/questions/models/question";
import { getQuestionTopicUseCase } from "@/questions/useCases/getQuestionTopicUseCase";

export const getTopicsForQuestionAction = async (
  questionId: ReadQuestionDto["id"],
) => {
  console.log("getTopicsForQuestionAction");
  console.log(questionId);
  const response = await getQuestionTopicUseCase(questionId);
  return response;
};
