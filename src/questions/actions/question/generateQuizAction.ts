"use server";

import { ReadTopicDto } from "@/questions/models/topic";
import { getRandomQuestionsUseCase } from "@/questions/useCases/getRandomQuestionsUseCase";

export const generateQuizAction = async (topicIds: ReadTopicDto["id"][]) => {
  const response = await getRandomQuestionsUseCase(topicIds);
  return response;
};
