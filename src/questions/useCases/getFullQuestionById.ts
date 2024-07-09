import { ReadQuestionDto } from "../models/question";
import { getFullQuestionService } from "../services/getFullQuestionService";

export const getFullQuestionById = async (
  id: ReadQuestionDto["id"],
  getFullQuestionById = getFullQuestionService,
) => {
  const fullQuestion = await getFullQuestionById(id);
  if (fullQuestion.length === 0) throw new Error("Question not found");
  return fullQuestion[0];
};
