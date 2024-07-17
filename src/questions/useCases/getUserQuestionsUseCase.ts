import { db } from "@/db/drizzle";

import { ReadQuestionDto } from "../models/question";
import { getAllQuestionsService } from "../services/crudQuestionService";

export const getUserQuestionsUseCase = async (
  autherId: ReadQuestionDto["authorId"],
  connection = db,
) => {
  const questions = await getAllQuestionsService(autherId, connection);
  return questions;
};
