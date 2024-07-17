import { db } from "@/db/drizzle";

import { ReadQuestionDto } from "../models/question";
import { ReadTopicDto } from "../models/topic";
import { addTopicsToQuestionUseCase } from "./addTopicsToQuestionUseCase";
import { updateQuestionUseCase } from "./crudQuestionUseCases";
import { removeTopicsFromQuestionUseCase } from "./removeTopicsFromQuestionUseCase";

export const updateFullQuestionUseCase = async (
  question: ReadQuestionDto,
  oldTopicIds: ReadTopicDto["id"][],
  newTopicIds: ReadTopicDto["id"][],
  userId: ReadQuestionDto["authorId"],
  connection = db,
) => {
  const updatedQuestion = await connection.transaction(async (trx) => {
    // Update the question
    const uquestion = await updateQuestionUseCase(question, userId, trx);
    // Update the topics , need to figure out a way to only change the updated topics
    const addedTopics = newTopicIds.filter((id) => !oldTopicIds.includes(id));

    await addTopicsToQuestionUseCase(uquestion.id, addedTopics, userId, trx);

    const removedTopics = oldTopicIds.filter((id) => !newTopicIds.includes(id));

    await removeTopicsFromQuestionUseCase(
      uquestion.id,
      removedTopics,
      userId,
      trx,
    );
    return uquestion;
  });
  return updatedQuestion;
};
