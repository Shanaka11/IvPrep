import { expect, test } from "vitest";

import { CreateQuestionDto, ReadQuestionSchema } from "../models/question";
import { createQuestionUseCase } from "../useCases/crudQuestionUseCases";

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
    authorId: "e0beaed0-9a3d-4dc1-9c44-9bb0d116c584",
  };
  const retData = await createQuestionUseCase(
    question,
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
        undefined,
        createQuestionMockService,
      ),
  ).rejects.toThrow(
    expect.arrayContaining([
      {
        path: "question",
        message: "String must contain at most 256 character(s)",
      },
      {
        path: "authorId",
        message: "Invalid uuid",
      },
    ]),
  );
});
