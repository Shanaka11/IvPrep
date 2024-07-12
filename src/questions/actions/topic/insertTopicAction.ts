"use server";

import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";
import { CreateTopicDto } from "@/questions/models/topic";
import { createTopicUseCase } from "@/questions/useCases/crudTopicUseCases";

export const createTopicAction = async (topic: CreateTopicDto) => {
  getAuthenticatedUser();
  // Create the topic
  const response = await createTopicUseCase(topic);
  // Invalidate cache
  return response;
};
