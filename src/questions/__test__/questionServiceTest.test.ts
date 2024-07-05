import { expect, test } from "vitest";

import { CreateQuestionDto, ReadQuestionDto } from "../models/question";
import { createQuestionService } from "../services/createQuestionService";

// mock database // Move this to a top level file if needed
const questions: ReadQuestionDto[] = [];

// mock respositroy
const mockRepository = {
  createQuestionRepository: async (data: CreateQuestionDto[]) => {
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
};

test("Test Question Service", async () => {
  // Create Question
  const question: CreateQuestionDto = {
    question: "What is the capital of Nigeria?",
    authorId: "1234",
  };
  const retData = await createQuestionService([question], mockRepository);

  expect(retData.length).toBe(1);
  expect(retData[0].id).toBe(1);
  expect(retData[0].question).toBe("What is the capital of Nigeria?");
  expect(retData[0].authorId).toBe("1234");
  expect(retData[0].createdAt).toBeDefined();
  expect(retData[0].updatedAt).toBeDefined();
});
