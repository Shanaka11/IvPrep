import { db } from "@/db/drizzle";
import { and, eq } from "drizzle-orm";

import { CreateTopicDto, ReadTopicDto, TopicTable } from "../models/topic";

//create
export const createTopicService = async (
  topic: CreateTopicDto,
  connection = db,
): Promise<ReadTopicDto[]> => {
  const createdTopic = await connection
    .insert(TopicTable)
    .values(topic)
    .returning();
  // Since we always insert items one by one, we can always return the first item
  return createdTopic;
};

//get by id
export const getTopicByIdService = async (
  id: ReadTopicDto["id"],
  connection = db,
): Promise<ReadTopicDto[]> => {
  const topic = await connection
    .select()
    .from(TopicTable)
    .where(and(eq(TopicTable.id, id), eq(TopicTable.active, true)));

  return topic;
};

//update
export const updateTopicService = async (
  topic: ReadTopicDto,
  connection = db,
): Promise<ReadTopicDto[]> => {
  const updatedTopic = await connection
    .update(TopicTable)
    .set(topic)
    .where(and(eq(TopicTable.id, topic.id), eq(TopicTable.active, true)))
    .returning();

  return updatedTopic;
};

//delete // We unly set the active flag to false when deleting

//get (Define getTopicServices sepcific to each use case i.e there will be no common get method)
export const getTopicByNameService = async (
  name: ReadTopicDto["name"],
  connection = db,
): Promise<ReadTopicDto[]> => {
  const topic = await connection
    .select()
    .from(TopicTable)
    .where(and(eq(TopicTable.name, name), eq(TopicTable.active, true)));

  return topic;
};
