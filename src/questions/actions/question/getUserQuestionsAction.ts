"use server";

import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";
import { getUserQuestionsUseCase } from "@/questions/useCases/getUserQuestionsUseCase";

type QuestionFilters = {
  searchString: string | null;
  topicIds: number[] | null;
};

export const getUserQuestionsAction = async ({
  searchString,
  topicIds,
}: QuestionFilters) => {
  const userId = getAuthenticatedUser();
  const questions = await getUserQuestionsUseCase(
    userId,
    searchString,
    topicIds,
  );
  return questions;
};
