import { defineConfig } from "drizzle-kit";

if (process.env.DATABASE_URL === undefined)
  throw new Error("DATABASE_URL is not defined");

export default defineConfig({
  dialect: "postgresql",
  out: "./src/db/migrations",
  schema: "./src/**/models/*.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
