import { db } from "@/db/drizzle";

import { ReadQuestionDto } from "../models/question";
import { getFullQuestionService } from "../services/getFullQuestionService";

export const getFullQuestionById = async (
  id: ReadQuestionDto["id"],
  connection = db,
  getFullQuestionById = getFullQuestionService,
) => {
  const fullQuestion = await getFullQuestionById(id, connection);
  if (fullQuestion.length === 0) throw new Error("Question not found");
  return fullQuestion[0];
};
