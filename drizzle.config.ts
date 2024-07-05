import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  out: "./src/db/migrations",
  schema: "./src/**/models/*.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
