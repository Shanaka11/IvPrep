import { parseZodErrors } from "@/util/zodErrorHandler";
import { ZodError } from "zod";

import {
  CreateTopicDto,
  CreateTopicSchema,
  UpdateTopicDto,
  UpdateTopicSchema,
} from "../models/topic";
import { ITopicRepository } from "../repositories/topicRepository";

export const createTopicService = async (
  data: CreateTopicDto[],
  repository: ITopicRepository,
) => {
  try {
    const clearedData = data.map((dataItem) => {
      const clearedDataItem = CreateTopicSchema.parse(dataItem);
      return {
        ...clearedDataItem,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    return await repository.createTopic(clearedData);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw parseZodErrors(error);
    }
    throw error;
  }
};

export const updateTopicService = async (
  data: UpdateTopicDto[],
  repository: ITopicRepository,
) => {
  try {
    return (
      await Promise.all(
        data.map(async (dataItem) => {
          // Validate data
          const clearedData = UpdateTopicSchema.parse(dataItem);

          // Get the existing question
          const existingQuestion = await getTopicService(
            clearedData.id,
            repository,
          );
          // Check if the updatedAt is the same as the one in the database
          // If it is not the same, throw an error
          if (existingQuestion.updatedAt !== clearedData.updatedAt)
            throw new Error("The question has been updated by someone else");
          // If it is the same, update the question // update the updatedAt field
          clearedData.updatedAt = new Date();
          return await repository.updateTopic(clearedData);
        }),
      )
    ).flat();
    // return await repository.UpdateTopic(data);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      throw parseZodErrors(error);
    }
    throw error;
  }
};

export const deleteTopicService = async (
  id: UpdateTopicDto["id"][],
  repository: ITopicRepository,
) => {
  return await repository.deleteTopic(id);
};

export const getTopicService = async (
  id: UpdateTopicDto["id"],
  repository: ITopicRepository,
) => {
  const topics = await repository.readTopic(id);
  if (topics.length === 0) throw new Error("Topic not found");
  return topics[0];
};
