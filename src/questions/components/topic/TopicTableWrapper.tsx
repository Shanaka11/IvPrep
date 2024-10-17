import { getAllTopicsAction } from "@/questions/actions/topic/getAllTopicsAction";
import React from "react";

import TopicTable from "./TopicTable";

type TopicTableWrapperProps = {
  searchString: string | null;
};

const TopicTableWrapper = async ({ searchString }: TopicTableWrapperProps) => {
  const topics = await getAllTopicsAction(searchString);

  return <TopicTable topics={topics} searchString={searchString} />;
};

export default TopicTableWrapper;
