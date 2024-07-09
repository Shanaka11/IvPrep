import { db } from "@/db/drizzle";

import { ReadQuestionDto } from "../models/question";
import { ReadTopicDto } from "../models/topic";
import { connectQuestionToTopicService } from "../services/crudQuestionTopicService";
import { getQuestionByIdUseCase } from "./crudQuestionUseCases";
import { getTopicByIdUseCase } from "./crudTopicUseCases";

export const addTopicsToQuestionUseCase = async (
  questionId: ReadQuestionDto["id"],
  topicIds: ReadTopicDto["id"][],
  userId: ReadQuestionDto["authorId"],
  connection = db,
  connectQuestionToTopic = connectQuestionToTopicService,
) => {
  // Check QuestionExist
  const question = await getQuestionByIdUseCase(questionId, connection);
  // Only the question auther can add topics to the question
  if (question.authorId !== userId)
    throw new Error("You are not allowed to add topics to this question");
  // Check that
  // Check Topic Exist
  connection.transaction(async (trx) => {
    for (const id of topicIds) {
      const topic = await getTopicByIdUseCase(id, trx);
      // Update QuestionTopicTable
      const result = await connectQuestionToTopic(questionId, id, trx);

      if (result.length === 0)
        throw new Error(`Failed to add ${topic.name} to question`);
    }
  });
};
