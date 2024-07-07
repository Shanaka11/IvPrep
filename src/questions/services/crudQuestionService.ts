import { parseZodErrors } from "@/util/zodErrorHandler";
import { ZodError } from "zod";

import {
  CreateQuestionDto,
  CreateQuestionSchema,
  ReadQuestionDto,
  UpdateQuestionDto,
  UpdateQuestionScehma,
} from "../models/question";
import { IQuestionRepository } from "../repositories/questionRepository";

export const createQuestionService = async (
  data: CreateQuestionDto[],
  repository: IQuestionRepository,
): Promise<ReadQuestionDto[]> => {
  try {
    // Validate data
    const clearedData = data.map((dataItem) => {
      const clearedDataItem = CreateQuestionSchema.parse(dataItem);
      return {
        ...clearedDataItem,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    return await repository.createQuestionRepository(clearedData);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw parseZodErrors(error);
    }
    throw error;
  }
};

export const updateQuestionService = async (
  data: UpdateQuestionDto[],
  repository: IQuestionRepository,
) => {
  try {
    return (
      await Promise.all(
        data.map(async (dataItem) => {
          // Validate data
          const clearedData = UpdateQuestionScehma.parse(dataItem);

          // Get the existing question
          const existingQuestion = await getQuestionService(
            clearedData.id,
            repository,
          );
          // Check if the updatedAt is the same as the one in the database
          // If it is not the same, throw an error
          if (existingQuestion.updatedAt !== clearedData.updatedAt)
            throw new Error("The question has been updated by someone else");
          // If it is the same, update the question // update the updatedAt field
          clearedData.updatedAt = new Date();
          return await repository.updateQuestionRepository(clearedData);
        }),
      )
    ).flat();
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw parseZodErrors(error);
    }
    throw error;
  }
};

export const deleteQuestionService = async (
  id: UpdateQuestionDto["id"][],
  respository: IQuestionRepository,
) => {
  // Implement delete question service
};

export const getQuestionService = async (
  filter: UpdateQuestionDto["id"], // For now this will just be a single id
  respository: IQuestionRepository,
) => {
  // Implement get question service
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
