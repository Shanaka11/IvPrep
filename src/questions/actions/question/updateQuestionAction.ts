"use server";

import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";
import { ReadQuestionDto } from "@/questions/models/question";
import { ReadTopicDto } from "@/questions/models/topic";
import { updateFullQuestionUseCase } from "@/questions/useCases/updateFullQuestionUseCase";
import { revalidatePath } from "next/cache";

export const updateQuestionAction = async (
  question: ReadQuestionDto,
  oldTopicIds: ReadTopicDto["id"][],
  newTopicIds: ReadTopicDto["id"][],
) => {
  const userId = getAuthenticatedUser();
  const response = await updateFullQuestionUseCase(
    question,
    oldTopicIds,
    newTopicIds,
    userId,
  );
  revalidatePath("/questions");
  return response;
};
