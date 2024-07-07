import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const TopicTable = pgTable("topic", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const ReadTopicSchema = createSelectSchema(TopicTable);
export const CreateTopicSchema = createSelectSchema(TopicTable).omit({
  id: true,
  active: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateTopicSchema = createSelectSchema(TopicTable)
  .omit({
    createdAt: true,
  })
  .required({ id: true, updatedAt: true, active: true });

export type CreateTopicDto = z.infer<typeof CreateTopicSchema>;
export type UpdateTopicDto = z.infer<typeof UpdateTopicSchema>;
export type ReadTopicDto = z.infer<typeof ReadTopicSchema>;
