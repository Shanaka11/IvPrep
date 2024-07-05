import { pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("question", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 256 }).notNull(),
  authorId: uuid("author_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
