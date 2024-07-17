import { db } from "@/db/drizzle";

import { ReadQuestionDto } from "../models/question";
import { getQuestionTopicsService } from "../services/getQuestionTopicsService";

export const getQuestionTopicUseCase = async (
  questionId: ReadQuestionDto["id"],
  connection = db,
  getQuestionTopics = getQuestionTopicsService,
) => {
  const topics = await getQuestionTopics(questionId, connection);
  return topics;
};
