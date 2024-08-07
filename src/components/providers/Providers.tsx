import { ClerkProvider } from "@clerk/nextjs";
import React, { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default Providers;
