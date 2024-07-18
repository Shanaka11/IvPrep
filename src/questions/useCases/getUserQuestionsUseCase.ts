import { db } from "@/db/drizzle";

import { ReadQuestionDto } from "../models/question";
import { getAllQuestionsService } from "../services/crudQuestionService";

export const getUserQuestionsUseCase = async (
  autherId: ReadQuestionDto["authorId"],
  searchString: string | null,
  topicIds: ReadQuestionDto["id"][] | null,
  connection = db,
) => {
  const questions = await getAllQuestionsService(
    autherId,
    searchString,
    topicIds,
    connection,
  );
  return questions;
};
