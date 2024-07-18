"use client";

import Tag from "@/components/tag/Tag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@/query/useQuery";
import { getAllTopicsAction } from "@/questions/actions/topic/getAllTopicsAction";
import { ReadTopicDto } from "@/questions/models/topic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import TopicLov from "../topic/TopicLov";

type QuestionTableSearchProps = {
  searchString: string | null;
  topicIds: ReadTopicDto["id"][];
};

const QuestionTableSearch = ({
  searchString,
  topicIds,
}: QuestionTableSearchProps) => {
  const [search, setSearch] = useState(searchString ?? "");
  const [selectedTopics, setSelectedTopics] = useState<
    Record<string, ReadTopicDto>
  >({});

  const { data: topics, isLoading } = useQuery<never, ReadTopicDto[]>({
    queryKey: "Topics",
    queryFn: () => {
      return getAllTopicsAction();
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (topics && topics?.length > 0 && topicIds.length > 0) {
      const selectedTopics = topics.filter((topic) =>
        topicIds.includes(topic.id),
      );
      const parsedTopics = selectedTopics.reduce(
        (acc, topic) => ({
          ...acc,
          [topic.id]: topic,
        }),
        {},
      );
      setSelectedTopics(parsedTopics);
    }
  }, [topicIds, topics]);

  useEffect(() => {
    router.push(getHref());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopics]);

  const getHref = () => {
    const selectedTopicIds = Object.keys(selectedTopics);

    // if both are empty, return "?"
    if (selectedTopicIds.length === 0 && (search === "" || search === null)) {
      return "?";
    }
    // if both topic and search are not empty
    if (selectedTopicIds.length > 0 && search !== "") {
      return `?search=${encodeURIComponent(search)}&topic=${selectedTopicIds.map((item) => encodeURI(item)).join("&topic=")}`;
    }
    // if search is empty, return "?topic=1&topic=2"
    if (selectedTopicIds.length > 0) {
      return `?topic=${selectedTopicIds.map((item) => encodeURI(item)).join("&topic=")}`;
    }
    // if selected is empty, return "?search=..."
    return `?search=${encodeURIComponent(search)}`;
  };

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(getHref());
    }
  };

  const handleOnChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

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

  return (
    <>
      <div className="flex gap-2">
        <Input
          value={search}
          onChange={handleOnChange}
          onKeyUp={handleOnKeyUp}
          placeholder="Type here..."
          autoFocus
        />
        <TopicLov onSelect={handleOnSelect} selectedTopics={selectedTopics} />
        <Link href={getHref()}>
          <Button>Search</Button>
        </Link>
      </div>
      <div className="flex gap-2">
        {Object.values(selectedTopics).map((topic) => (
          <Tag
            title={topic.name}
            key={topic.id}
            handleClose={() => handleTopicDeselect(topic.id)}
          />
        ))}
      </div>
    </>
  );
};

export default QuestionTableSearch;
