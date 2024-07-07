import { expect, test } from "vitest";

import {
  CreateQuestionDto,
  ReadQuestionDto,
  UpdateQuestionDto,
} from "../models/question";
import { createQuestionService } from "../services/crudQuestionService";

// mock database // Move this to a top level file if needed
const questions: ReadQuestionDto[] = [];

// mock respositroy
const mockRepository = {
  createQuestionRepository: async (
    data: CreateQuestionDto[],
  ): Promise<ReadQuestionDto[]> => {
    const createdData = data.map((item, index) => {
      return {
        ...item,
        id: index + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    //questions.push(...createdData);
    return createdData;
  },
  updateQuestionRepository: async (
    data: UpdateQuestionDto,
  ): Promise<ReadQuestionDto[]> => {
    return [
      {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  },
};

test("Create Question Service Correct Input", async () => {
  // Create Question
  const question: CreateQuestionDto = {
    question: "What is the capital of Nigeria?",
    authorId: "e0beaed0-9a3d-4dc1-9c44-9bb0d116c584",
  };
  const retData = await createQuestionService([question], mockRepository);

  expect(retData.length).toBe(1);
  expect(retData[0].id).toBe(1);
  expect(retData[0].question).toBe("What is the capital of Nigeria?");
  expect(retData[0].authorId).toBe("e0beaed0-9a3d-4dc1-9c44-9bb0d116c584");
  expect(retData[0].createdAt).toBeDefined();
  expect(retData[0].updatedAt).toBeDefined();
});

test("Create Question Service Correct Input", async () => {
  // Create Question

  const question: CreateQuestionDto = {
    question:
      "4kHdCKOIiNYdlKQE9DU4AMjexB0Mx5gn0NRwmnn6SmPavtCB3OfqtNVLZkVcPYpR6OsSMqZ11AmNguq2sjUU3V9BjHdWj71hPOag0CG1Q0YT6L3YqLXZNi2fdRysMdG3nBbENLoSw2SoyMl09sukx8noNTywbuMGFNLP5c7Qp7WUNPCMirR5yqngPCTRVwDIQccIv9gVfadOPrmpiuXU8xs8jencC6gWGAGOOt0oEhzptBAtx7H9OGHUPzR766j2r6Vv",
    authorId: "1234",
  };
  expect(
    async () => await createQuestionService([question], mockRepository),
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
