import { expect, test } from "vitest";

import { CreateQuestionDto, ReadQuestionSchema } from "../models/question";
import { ReadTopicDto } from "../models/topic";
import { createQuestionUseCase } from "../useCases/crudQuestionUseCases";
import { getRandomQuestionsUseCase } from "../useCases/getRandomQuestionsUseCase";
import { mockDatabase } from "./mockDatabase";

// Mock createQuestionService
//createQuestion: (question: CreateQuestionDto, connection?: PostgresJsDatabase<Record<string, never>>) => Promise<ReadQuestionDto[]>
const createQuestionMockService = async (question: CreateQuestionDto) => {
  question.id = 1;
  return [ReadQuestionSchema.parse(question)];
};

test("Create Question Service Correct Input", async () => {
  // Create Question
  const question: CreateQuestionDto = {
    question: "What is the capital of Nigeria?",
    authorId: "e0beaed0-9a3d-4dc1-9c44-9bb0d116c581",
  };
  const retData = await createQuestionUseCase(
    question,
    "e0beaed0-9a3d-4dc1-9c44-9bb0d116c584",
    undefined,
    createQuestionMockService,
  );

  expect(retData.id).toBe(1);
  expect(retData.question).toBe("What is the capital of Nigeria?");
  expect(retData.authorId).toBe("e0beaed0-9a3d-4dc1-9c44-9bb0d116c584");
  expect(retData.createdAt).toBeDefined();
  expect(retData.updatedAt).toBeDefined();
});

test("Create Question Service InCorrect Input", async () => {
  // Create Question

  const question: CreateQuestionDto = {
    question:
      "4kHdCKOIiNYdlKQE9DU4AMjexB0Mx5gn0NRwmnn6SmPavtCB3OfqtNVLZkVcPYpR6OsSMqZ11AmNguq2sjUU3V9BjHdWj71hPOag0CG1Q0YT6L3YqLXZNi2fdRysMdG3nBbENLoSw2SoyMl09sukx8noNTywbuMGFNLP5c7Qp7WUNPCMirR5yqngPCTRVwDIQccIv9gVfadOPrmpiuXU8xs8jencC6gWGAGOOt0oEhzptBAtx7H9OGHUPzR766j2r6Vv",
    authorId: "1234",
  };
  expect(
    async () =>
      await createQuestionUseCase(
        question,
        "e0beaed0-9a3d-4dc1-9c44-9bb0d116c584",
        undefined,
        createQuestionMockService,
      ),
  ).rejects.toThrow(
    expect.arrayContaining([
      {
        path: "question",
        message: "String must contain at most 256 character(s)",
      },
    ]),
  );
});

const mockGetQuestionsForTopicsService = async (ids: ReadTopicDto["id"][]) => {
  //
  const questions = mockDatabase.question.map((question) => {
    return {
      ...question,
      topics: mockDatabase.topic.filter((topic) => topic.id === ids[0]),
    };
  });
  return questions;
};

test("Get random questions when given a topic", async () => {
  const questions1 = await getRandomQuestionsUseCase(
    [1],
    undefined,
    mockGetQuestionsForTopicsService,
  );
  // Should have 10 questions
  expect(questions1.length).toBe(10);

  // Fetch questions a second time,
  const questions2 = await getRandomQuestionsUseCase(
    [1],
    undefined,
    mockGetQuestionsForTopicsService,
  );
  // Should have 10 questions
  expect(questions2.length).toBe(10);

  var isEqual = true;
  // questions1 and questions2 should not be the same
  for (let i = 0; i < 10; i++) {
    if (questions1[i].id !== questions2[i].id) {
      isEqual = false;
      break;
    }
  }

  expect(isEqual).toEqual(false);
});
