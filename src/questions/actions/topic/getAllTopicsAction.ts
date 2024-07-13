"use server";

import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";
import { getAllTopicsUseCase } from "@/questions/useCases/crudTopicUseCases";

export const getAllTopicsAction = async (searchString?: string) => {
  getAuthenticatedUser();
  return getAllTopicsUseCase(searchString);
};
