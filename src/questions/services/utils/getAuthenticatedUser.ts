import { auth } from "@clerk/nextjs/server";

export const getAuthenticatedUser = () => {
  // Get the user
  // Make sure he is authenticated
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to add an topcs");
  }
  return userId;
};
