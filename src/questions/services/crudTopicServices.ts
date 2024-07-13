import { and, eq, ilike } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { CreateTopicDto, ReadTopicDto, TopicTable } from "../models/topic";

//create
export const createTopicService = async (
  topic: CreateTopicDto,
  connection: PostgresJsDatabase<Record<string, never>>,
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
  connection: PostgresJsDatabase<Record<string, never>>,
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
  connection: PostgresJsDatabase<Record<string, never>>,
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
  connection: PostgresJsDatabase<Record<string, never>>,
): Promise<ReadTopicDto[]> => {
  const topic = await connection
    .select()
    .from(TopicTable)
    .where(and(eq(TopicTable.name, name), eq(TopicTable.active, true)));

  return topic;
};

// get all topics
export const getAllTopicsService = async (
  connection: PostgresJsDatabase<Record<string, never>>,
): Promise<ReadTopicDto[]> => {
  const topics = await connection
    .select()
    .from(TopicTable)
    .where(eq(TopicTable.active, true))
    .orderBy(TopicTable.id);

  return topics;
};

// get filtered topics
export const getFilteredTopicsService = async (
  searchString: string,
  connection: PostgresJsDatabase<Record<string, never>>,
): Promise<ReadTopicDto[]> => {
  const topics = await connection
    .select()
    .from(TopicTable)
    .where(
      and(
        eq(TopicTable.active, true),
        ilike(TopicTable.name, `%${searchString}%`),
      ),
    )
    .orderBy(TopicTable.id);

  return topics;
};
