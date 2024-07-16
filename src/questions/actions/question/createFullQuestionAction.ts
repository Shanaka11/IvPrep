"use server";

import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";
import { CreateQuestionDto } from "@/questions/models/question";
import { ReadTopicDto } from "@/questions/models/topic";
import { createFullQuestion } from "@/questions/useCases/createFullQuestion";
import { revalidatePath } from "next/cache";

export const createFullQuestionAction = async (
  question: CreateQuestionDto,
  topicIds: ReadTopicDto["id"][],
) => {
  const userId = getAuthenticatedUser();
  const response = await createFullQuestion(question, topicIds, userId);
  revalidatePath("/questions");
  return response;
};
