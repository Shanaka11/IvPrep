"use server";

import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";
import { CreateTopicDto } from "@/questions/models/topic";
import { updateTopicUseCase } from "@/questions/useCases/crudTopicUseCases";
import { revalidatePath } from "next/cache";

export const updateTopicAction = async (topic: CreateTopicDto) => {
  getAuthenticatedUser();
  // Update topic
  const response = await updateTopicUseCase(topic);
  // invalidate cache
  revalidatePath("/topics");

  return response;
};
