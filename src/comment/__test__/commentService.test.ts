import { ReadQuestionDto } from "@/questions/models/question";
import { expect, test } from "vitest";

import {
  CreateCommentDto,
  ReadCommentDto,
  ReadCommentSchema,
} from "../models/comment";
import { createCommentUseCase } from "../useCases/crudCommentUseCases";
import { mockDatabase } from "./mockDatabase";

const createCommentMockService = async (comment: ReadCommentDto) => {
  return [ReadCommentSchema.parse(comment)];
};

const getQuestionByIdMockService = async (id: ReadQuestionDto["id"]) => {
  return mockDatabase.question.filter((question) => question.id === id);
};

test("Create Comments Use Case With Correct Data", async () => {
  const comment: CreateCommentDto = {
    comment: "This is a comment",
    authorId: "e0beaed0-9a3d-4dc1-9c44-9bb0d116c581",
    questionId: 1,
  };
  const retData = await createCommentUseCase(
    comment,
    "e0beaed0-9a3d-4dc1-9c44-9bb0d116c584",
    undefined,
    createCommentMockService,
    getQuestionByIdMockService,
  );

  expect(retData.id).toBeDefined();
  expect(retData.comment).toBe("This is a comment");
  expect(retData.authorId).toBe("e0beaed0-9a3d-4dc1-9c44-9bb0d116c584");
  expect(retData.createdAt).toBeDefined();
  expect(retData.updatedAt).toBeDefined();
});

test("Create Comments Use Case With Incorrect Data", async () => {
  const comment: CreateCommentDto = {
    comment: "This is a comment",
    authorId: "e0beaed0-9a3d-4dc1-9c44-9bb0d116c581",
    questionId: 2,
  };
  // With the wrong question
  expect(
    async () =>
      await createCommentUseCase(
        comment,
        "e0beaed0-9a3d-4dc1-9c44-9bb0d116c584",
        undefined,
        createCommentMockService,
        getQuestionByIdMockService,
      ),
  ).rejects.toThrow("Question not found");
});
