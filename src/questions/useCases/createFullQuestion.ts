import { CreateQuestionDto } from "../models/question";
import { ReadTopicDto } from "../models/topic";

// params, question, topics["id"] and service
export const createFullQuestion = (
  question: CreateQuestionDto,
  topicIds: ReadTopicDto["id"][],
) => {
  // Validate Question
  // Validate Topics
  // Check if topic exist for a value in topics
  // Create Question
  // Attach topics to question
};
