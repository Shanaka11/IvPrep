import { db } from "@/db/drizzle";

import { CreateQuestionDto, ReadQuestionDto } from "../models/question";
import { ReadTopicDto } from "../models/topic";
import { addTopicsToQuestionUseCase } from "./addTopicsToQuestionUseCase";
import { createQuestionUseCase } from "./crudQuestionUseCases";
import { getFullQuestionById } from "./getFullQuestionById";

// params, question, topics["id"] and service
export const createFullQuestion = async (
  question: CreateQuestionDto,
  topicIds: ReadTopicDto["id"][],
  userId: ReadQuestionDto["authorId"],
  connection = db,
) => {
  const createdQuestion = await connection.transaction(async (trx) => {
    // Create Question
    const createdQuestion = await createQuestionUseCase(question, userId, trx);
    // Attach topics to question
    await addTopicsToQuestionUseCase(createdQuestion.id, topicIds, userId, trx);
    // Return the created question
    return await getFullQuestionById(createdQuestion.id, trx);
  });

  return {
    ...createdQuestion.question,
    topics: createdQuestion.topic,
  };
};
