import { db } from "@/db/drizzle";

import { ReadQuestionDto } from "../models/question";
import { disconnectQuestionToTopicService } from "../services/crudQuestionTopicService";
import { getQuestionByIdUseCase } from "./crudQuestionUseCases";
import { getTopicByIdUseCase } from "./crudTopicUseCases";

export const removeTopicsFromQuestionUseCase = async (
  questionId: ReadQuestionDto["id"],
  topicIds: ReadQuestionDto["id"][],
  userId: ReadQuestionDto["authorId"],
  connection = db,
) => {
  // Check QuestionExist
  const question = await getQuestionByIdUseCase(questionId);
  // Only the question auther can add topics to the question
  if (question.authorId !== userId)
    throw new Error("You are not allowed to add topics to this question");
  // Check that
  // Check Topic Exist
  connection.transaction(async (trx) => {
    for (const id of topicIds) {
      const topic = await getTopicByIdUseCase(id, trx);
      // Update QuestionTopicTable
      const result = await disconnectQuestionToTopicService(
        questionId,
        id,
        trx,
      );

      if (result.length === 0)
        throw new Error(`Failed to remove ${topic.name} from question`);
    }
  });
};
