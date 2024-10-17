import { Separator } from "@/components/ui/separator";
import QuestionGeneratorWrapper from "@/questions/components/question/QuestionGeneratorWrapper";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="p-2 w-screen container">
      <QuestionGeneratorWrapper />
      <Separator className="my-2 bg-transparent bg-gradient-to-r from-transparent via-primary" />
      {children}
    </div>
  );
};

export default layout;
