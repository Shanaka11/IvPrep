import { CreateQuestionDto, ReadQuestionDto } from "../models/question";
import {
  IQuestionRepository,
  //   questionRepository,
} from "../repositories/questionRepository";

// By default it will use the repository defined, we can inject a different repository for testing
export const createQuestionService = async (
  data: CreateQuestionDto[],
  repository: IQuestionRepository,
): Promise<ReadQuestionDto[]> => {
  return await repository.createQuestionRepository(data);
};
