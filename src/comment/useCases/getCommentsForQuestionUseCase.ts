import { db } from "@/db/drizzle";
import { parseZodErrors } from "@/util/zodErrorHandler";
import { ZodError } from "zod";

import { ReadCommentDto } from "../models/comment";
import { getCommentsForQuestionService } from "../services/getCommentsForQuestionService";

export const getCommentsForQuestionUseCase = async (
  questionId: ReadCommentDto["questionId"],
  page: number = -1,
  connection = db,
  getCommentsForQuestion = getCommentsForQuestionService,
) => {
  try {
    const comments = await getCommentsForQuestion(questionId, page, connection);
    return comments;
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw parseZodErrors(error);
    }
    throw error;
  }
};
