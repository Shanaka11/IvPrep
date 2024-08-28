import { db } from "@/db/drizzle";

import { ReadQuestionDto } from "../models/question";
import { ReadTopicDto } from "../models/topic";
import { getQuestionsForTopicsService } from "../services/getQuestionsForTopicsService";

const NUMBER_OF_QUESTIONS = 10;

export const getRandomQuestionsUseCase = async (
  topicIds: ReadTopicDto["id"][],
  connecttion = db,
  getQuestionsForTopics = getQuestionsForTopicsService,
) => {
  // Get all the recrords from the database that is connected to the topic
  const questions = await getQuestionsForTopics(topicIds, connecttion);
  // Get random 10 questions from the records
  return getRandomElementsFromArray(
    questions,
    NUMBER_OF_QUESTIONS,
  ) as ReadQuestionDto[];
};

function getRandomElementsFromArray(arr: any[], n: number) {
  const result = [];
  const len = arr.length;

  // Edge case: If the array has fewer than n elements
  if (n > len) {
    // return all elements
    return arr;
  }

  // Create a copy of the array to shuffle
  const shuffled = arr.slice();

  for (let i = len - 1; i > len - n - 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    result.push(shuffled[i]);
  }

  return result;
}
