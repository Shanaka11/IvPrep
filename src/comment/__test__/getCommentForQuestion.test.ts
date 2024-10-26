import { COMMENT_PAGE_SIZE } from "@/util/consts";
import { expect, test } from "vitest";

import { ReadCommentDto } from "../models/comment";
import { getCommentsForQuestionUseCase } from "../useCases/getCommentsForQuestionUseCase";
import { mockDatabase } from "./mockDatabase";

const getCommentForQuestionMockService = async (
  questionId: ReadCommentDto["questionId"],
  page: number = -1, // -1 means no pagination
) => {
  //   return mockDatabase.comment;
  if (page !== -1) {
    const start = (page - 1) * COMMENT_PAGE_SIZE;
    const end = start + COMMENT_PAGE_SIZE;
    return mockDatabase.comment
      .filter((comment) => comment.questionId === questionId)
      .slice(start, end);
  }
  return mockDatabase.comment.filter(
    (comment) => comment.questionId === questionId,
  );
};

// Test getCommentsForQuestionUseCase
test("Get Comments For Question Use Case", async () => {
  const comments = await getCommentsForQuestionUseCase(
    1, // questionId,
    -1,
    undefined,
    getCommentForQuestionMockService,
  );

  expect(comments.length).toBe(9);
});

// Test Pagination for getCommentsForQuestionUseCase
test("Get Comments For Question Pagination", async () => {
  const commentsPage1 = await getCommentsForQuestionUseCase(
    1,
    1,
    undefined,
    getCommentForQuestionMockService,
  );

  expect(commentsPage1.length).toBe(5);

  const commentsPage2 = await getCommentsForQuestionUseCase(
    1,
    2,
    undefined,
    getCommentForQuestionMockService,
  );

  expect(commentsPage2.length).toBe(4);
});

// Test Sort (Answer should always be first, but can be sorted according to the created date or number of votes) with pagination
