import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const TopicTable = pgTable("topic", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const ReadTopicSchema = createSelectSchema(TopicTable);
export const CreateTopicSchema = createInsertSchema(TopicTable);

export type CreateTopicDto = z.infer<typeof CreateTopicSchema>;
export type ReadTopicDto = z.infer<typeof ReadTopicSchema>;
