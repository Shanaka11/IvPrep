import { auth } from "@clerk/nextjs/server";

export const hasPermission = () => {
  const user = auth();
  return user?.userId === process.env.NEXT_PUBLIC_A;
};
