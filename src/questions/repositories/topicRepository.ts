import { db } from "@/db/drizzle";
import { eq, inArray } from "drizzle-orm";

import {
  CreateTopicDto,
  ReadTopicDto,
  TopicTable,
  UpdateTopicDto,
} from "../models/topic";

const createTopic = async (data: CreateTopicDto[]): Promise<ReadTopicDto[]> => {
  return await db.insert(TopicTable).values(data).returning();
};

const updateTopic = async (data: UpdateTopicDto): Promise<ReadTopicDto[]> => {
  return await db.update(TopicTable).set(data).returning();
};

const deleteTopic = async (
  ids: UpdateTopicDto["id"][],
): Promise<ReadTopicDto[]> => {
  return await db
    .update(TopicTable)
    .set({ active: false })
    .where(inArray(TopicTable.id, ids))
    .returning();
};

const readTopic = async (id: UpdateTopicDto["id"]): Promise<ReadTopicDto[]> => {
  return await db.select().from(TopicTable).where(eq(TopicTable.id, id));
};

export const topicRepository = {
  createTopic,
  updateTopic,
  deleteTopic,
  readTopic,
};

export type ITopicRepository = typeof topicRepository;
