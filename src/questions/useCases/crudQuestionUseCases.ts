import { parseZodErrors } from "@/util/zodErrorHandler";
import { ZodError } from "zod";

import {
  CreateQuestionDto,
  CreateQuestionSchema,
  ReadQuestionDto,
  ReadQuestionSchema,
} from "../models/question";
import {
  createQuestionService,
  getQuestionByIdService,
  updateQuestionService,
} from "../services/crudQuestionService";

// Create Question
export const createQuestionUseCase = async (
  question: CreateQuestionDto,
  createQuestion = createQuestionService,
) => {
  try {
    // Validate question with zod
    const validatedQuestion = CreateQuestionSchema.parse(question);

    // Set the id to undefined to let the database generate it
    validatedQuestion.id = undefined;
    // Add UpdatedAt and CreatedAt fields
    validatedQuestion.updatedAt = new Date();
    validatedQuestion.createdAt = validatedQuestion.updatedAt;
    // New records are always active
    validatedQuestion.active = true;
    // Insert question into database

    const createdQuestion = await createQuestion(validatedQuestion);
    if (createdQuestion.length === 0)
      throw new Error("Failed to create question");
    return createdQuestion[0];
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw parseZodErrors(error);
    }
    throw error;
  }
};

// Get Question By Id
export const getQuestionByIdUseCase = async (
  id: ReadQuestionDto["id"],
  getQuestionById = getQuestionByIdService,
) => {
  const question = await getQuestionById(id);
  if (question.length === 0) throw new Error("Question not found");
  return question[0];
};

// Update
export const updateQuestionUseCase = async (
  question: ReadQuestionDto,
  updateQuestion = updateQuestionService,
) => {
  try {
    // Validate question with zod
    const validatedQuestion = ReadQuestionSchema.parse(question);

    // Get question by id
    const oldQuestion = await getQuestionByIdUseCase(validatedQuestion.id);
    // check updatedAt
    if (oldQuestion.updatedAt !== validatedQuestion.updatedAt)
      throw new Error("Question has been updated by someone else");

    // Add UpdatedAt field
    validatedQuestion.updatedAt = new Date();
    // Update question in database
    const updatedQuestion = await updateQuestion(validatedQuestion);
    if (updatedQuestion.length === 0)
      throw new Error("Failed to update question");
    return updatedQuestion[0];
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw parseZodErrors(error);
    }
    throw error;
  }
};

// Delete
export const deleteQuestionUseCase = async (question: ReadQuestionDto) => {
  const oldQuestion = await getQuestionByIdUseCase(question.id);
  // check updatedAt
  if (oldQuestion.updatedAt !== question.updatedAt)
    throw new Error("Question has been updated by someone else");
  oldQuestion.active = false;
  return await updateQuestionUseCase(oldQuestion);
};
