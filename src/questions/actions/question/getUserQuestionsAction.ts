"use server";

import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";
import { getUserQuestionsUseCase } from "@/questions/useCases/getUserQuestionsUseCase";

type QuestionFilters = {
  searchString: string | null;
  topicIds: number[] | null;
  getAll?: boolean;
};

export const getUserQuestionsAction = async ({
  searchString,
  topicIds,
  getAll = false,
}: QuestionFilters) => {
  let userId = null;
  if (!getAll) {
    userId = getAuthenticatedUser();
  }
  const questions = await getUserQuestionsUseCase(
    userId,
    searchString,
    topicIds,
  );
  return questions;
};
