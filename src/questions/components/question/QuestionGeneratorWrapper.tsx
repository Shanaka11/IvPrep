"use client";

import { parseTopics } from "@/util/parseTopics";
import { useSearchParams } from "next/navigation";
import React from "react";

import QuestionGenerator from "./QuestionGenerator";

const QuestionGeneratorWrapper = () => {
  const searchParams = useSearchParams();

  const topics = searchParams.get("topic");

  if (topics !== null) {
    const parsedTopics = parseTopics(topics);
    return <QuestionGenerator topics={parsedTopics} small />;
  }
  return <QuestionGenerator small />;
};

export default QuestionGeneratorWrapper;
