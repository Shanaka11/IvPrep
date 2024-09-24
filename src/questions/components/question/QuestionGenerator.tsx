"use client";

import Tag from "@/components/tag/Tag";
import { Button } from "@/components/ui/button";
import { ReadTopicDto } from "@/questions/models/topic";
import { CheckCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import TopicLov from "../topic/TopicLov";

type TSelectedTopics = Pick<ReadTopicDto, "id" | "name">;
type QuestionGeneratorProps = {
  topics?: TSelectedTopics[];
  title?: string;
  buttonTitle?: string;
  small?: boolean;
};

const parseSelectedTopics = (topics: TSelectedTopics[]) => {
  const parsedSelectedTopics: Record<string, TSelectedTopics> = {};
  topics.forEach((topic) => {
    parsedSelectedTopics[topic.id] = topic;
  });
  return parsedSelectedTopics;
};

const QuestionGenerator = ({
  topics,
  small,
  title,
  buttonTitle,
}: QuestionGeneratorProps) => {
  const [selectedTopics, setSelectedTopics] = useState<
    Record<string, TSelectedTopics>
  >(topics !== undefined ? parseSelectedTopics(topics) : {});

  const router = useRouter();

  const handleOnSelect = (selectedTopic: ReadTopicDto) => {
    setSelectedTopics((prev) => ({
      ...prev,
      [selectedTopic.id]: selectedTopic,
    }));
  };

  const handleTopicDeselect = (id: ReadTopicDto["id"]) => {
    setSelectedTopics((prev) => {
      const { [id]: omit, ...rest } = prev;
      return rest;
    });
  };

  const handleGenerateQuizOnClick = () => {
    const selectedTopicIds = Object.values(selectedTopics)
      .map((item) => encodeURI(`${item.id},${item.name}`))
      .join("&topic=");
    router.push(`/quiz?topic=${selectedTopicIds}`);
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-[700px]">
      <div className="flex">
        <TopicLov
          onTopicSelect={handleOnSelect}
          selectedTopics={selectedTopics}
          className="h-14 rounded-s-full"
          title={title ? title : `Select Topics`}
        />
        <Button
          className="h-14 rounded-e-full"
          title="Generate Quiz"
          onClick={handleGenerateQuizOnClick}
        >
          {buttonTitle && <span className="mr-4">{buttonTitle}</span>}
          <CheckCheck size={24} />
        </Button>
      </div>
      {/* show selected topics */}
      <div
        className={`flex gap-2 px-1 ${small ? "justify-start" : "justify-center"}`}
      >
        {Object.values(selectedTopics).map((topic) => (
          <Tag
            title={topic.name}
            key={topic.id}
            handleClose={() => handleTopicDeselect(topic.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionGenerator;
