import { auth } from "@clerk/nextjs/server";

export const getAuthenticatedUser = () => {
  const user = auth();
  if (!user || user.userId == null) throw new Error("User not authenticated");
  return user.userId;
};
