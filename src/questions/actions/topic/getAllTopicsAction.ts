"use server";

import { getAllTopicsUseCase } from "@/questions/useCases/crudTopicUseCases";

export const getAllTopicsAction = async (searchString?: string) => {
  return getAllTopicsUseCase(searchString);
};
