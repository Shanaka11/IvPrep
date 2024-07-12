import { getAuthenticatedUser } from "@/auth/getAuthenticatedUser";
import { getAllTopicsUseCase } from "@/questions/useCases/crudTopicUseCases";

export const getAllTopicsAction = async () => {
  getAuthenticatedUser();
  return getAllTopicsUseCase();
};
