import { Separator } from "@/components/ui/separator";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex flex-col gap-2 w-full max-w-screen-2xl px-6 mx-auto mt-4 container pb-6">
      <h1 className="text-2xl font-bold">Topics</h1>
      <Separator className="my-2 bg-transparent bg-gradient-to-r from-transparent via-primary" />
      {children}
    </main>
  );
};

export default layout;
