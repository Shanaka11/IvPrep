import { ReadQuestionDto } from "@/questions/models/question";
import { ReadTopicDto } from "@/questions/models/topic";

type ResultType = {
  topic: ReadTopicDto | null;
  question: ReadQuestionDto;
  question_topic: {
    questionId: ReadQuestionDto["id"];
    topicId: ReadTopicDto["id"];
  } | null;
};

export const formatFullQuestionDrizzle = (results: ResultType[]) => {
  const questionsWithTopics: {
    [key: number]: {
      id: number;
      question: string;
      authorId: string;
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
      topics: { id: number; name: string }[];
    };
  } = {};

  results.forEach((result) => {
    if (!questionsWithTopics[result.question.id]) {
      questionsWithTopics[result.question.id] = {
        id: result.question.id,
        question: result.question.question,
        authorId: result.question.authorId,
        active: result.question.active,
        createdAt: result.question.createdAt,
        updatedAt: result.question.updatedAt,
        topics: [],
      };
    }

    if (result.topic != null) {
      questionsWithTopics[result.question.id].topics.push({
        id: result.topic.id,
        name: result.topic.name,
      });
    }
  });

  return Object.values(questionsWithTopics);
};
