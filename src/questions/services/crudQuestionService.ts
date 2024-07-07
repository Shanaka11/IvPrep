import { parseZodErrors } from "@/util/zodErrorHandler";
import { ZodError } from "zod";

import {
  CreateQuestionDto,
  CreateQuestionSchema,
  ReadQuestionDto,
} from "../models/question";
import { IQuestionRepository } from "../repositories/questionRepository";

export const createQuestionService = async (
  data: CreateQuestionDto[],
  repository: IQuestionRepository,
): Promise<ReadQuestionDto[]> => {
  try {
    // Validate data
    const clearedData = data.map((dataItem) =>
      CreateQuestionSchema.parse(dataItem),
    );
    return await repository.createQuestionRepository(clearedData);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw parseZodErrors(error);
    }
    throw error;
  }
};

export const updateQuestionService = async (
  id: number,
  data: CreateQuestionDto[],
  repository: IQuestionRepository,
) => {
  return;
};
