"use server";

import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";
import { ReadTopicDto } from "@/questions/models/topic";
import { bulkDeleteTopicsUseCase } from "@/questions/useCases/crudTopicUseCases";
import { revalidatePath } from "next/cache";

export const deleteTopicAction = async (topics: ReadTopicDto[]) => {
  getAuthenticatedUser();
  const response = await bulkDeleteTopicsUseCase(topics);
  revalidatePath("/topics");
  return response;
};
