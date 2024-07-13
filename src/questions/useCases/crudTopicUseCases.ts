import { db } from "@/db/drizzle";

import {
  CreateTopicDto,
  CreateTopicSchema,
  ReadTopicDto,
  ReadTopicSchema,
  TopicTable,
} from "../models/topic";
import {
  createTopicService,
  getAllTopicsService,
  getFilteredTopicsService,
  getTopicByIdService,
  getTopicByNameService,
  updateTopicService,
} from "../services/crudTopicServices";

//Create
export const createTopicUseCase = async (
  topic: CreateTopicDto,
  connection = db,
  createTopic = createTopicService,
) => {
  // Later restrict this to only allow admins
  // Validate topic with zod

  const validatedTopic = CreateTopicSchema.parse(topic);

  // Check if a topic with the same name already exists
  if (await checkTopicExistsUseCase(validatedTopic.name))
    throw new Error(
      `Topic with the name '${validatedTopic.name}' already exists`,
    );
  // Set the id to undefined to let the database generate it
  validatedTopic.id = undefined;
  // Add UpdatedAt and CreatedAt fields
  validatedTopic.updatedAt = new Date();
  validatedTopic.createdAt = validatedTopic.updatedAt;
  // New records are always active
  validatedTopic.active = true;
  // Insert topic into database

  const createdTopic = await createTopic(validatedTopic, connection);
  if (createdTopic.length === 0) throw new Error("Failed to create topic");
  return createdTopic[0];
};

//Get By Id
export const getTopicByIdUseCase = async (
  id: ReadTopicDto["id"],
  connection = db,
  getTopicById = getTopicByIdService,
) => {
  const topic = await getTopicById(id, connection);
  if (topic.length === 0) throw new Error("Topic not found");
  return topic[0];
};

//Update
export const updateTopicUseCase = async (
  topic: CreateTopicDto,
  connection = db,
  updateTopic = updateTopicService,
) => {
  // Validate topic with zod
  const validatedTopic = ReadTopicSchema.parse(topic);

  // Get the topic by id
  const oldTopic = await getTopicByIdUseCase(validatedTopic.id);

  // Check if a topic with the same name already exists, If the name is updated only then do this check
  if (oldTopic.name !== validatedTopic.name) {
    if (await checkTopicExistsUseCase(validatedTopic.name))
      throw new Error(
        `Topic with the name '${validatedTopic.name}' already exists`,
      );
  }

  // Check updated at values
  if (oldTopic.updatedAt.getTime() !== validatedTopic.updatedAt.getTime())
    throw new Error("Topic has been updated by another user");
  // if same update else throw an error
  // Add UpdatedAt fields
  validatedTopic.updatedAt = new Date();
  // Update topic in database
  const updatedTopic = await updateTopic(validatedTopic, connection);
  if (updatedTopic.length === 0) throw new Error("Failed to update Topic");
  return updatedTopic[0];
};

//Delete
export const deleteTopicUseCase = async (
  topic: ReadTopicDto,
  connection = db,
) => {
  // Check if any questions are associated with the topic if so not allowed to delete
  // Get the topic by id
  const oldTopic = await getTopicByIdUseCase(topic.id, connection);
  // Check updated at values
  if (oldTopic.updatedAt.getTime() !== topic.updatedAt.getTime())
    throw new Error("Topic has been updated by another user");
  // Set active flag to false
  oldTopic.active = false;
  // Update topic in database
  return await updateTopicUseCase(oldTopic, connection);
};

// Bulk Delete
export const bulkDeleteTopicsUseCase = async (
  topics: ReadTopicDto[],
  connection = db,
) => {
  for (let i = 0; i < topics.length; i++) {
    await deleteTopicUseCase(topics[i], connection);
  }
};

// Check Topic with the same name exists
export const checkTopicExistsUseCase = async (
  name: string,
  connection = db,
  getTopicByName = getTopicByNameService,
) => {
  const topic = await getTopicByName(name, connection);
  if (topic.length > 0) return true;
  return false;
};

//Get Many
export const getAllTopicsUseCase = async (
  searchString?: string,
  connection = db,
  getAllTopics = getAllTopicsService,
  getFilteredTopics = getFilteredTopicsService,
) => {
  if (searchString) {
    return await getFilteredTopics(searchString, connection);
  }
  return await getAllTopics(connection);
};
