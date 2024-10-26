import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

dotenv.config();

const startMigration = async () => {
  const migrationClient = postgres(process.env.DATABASE_URL as string, {
    max: 1,
  });
  console.log("Starting migration", process.env.DATABASE_URL as string);
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./src/db/migrations",
  });
  migrationClient.end();
  console.log("Migration complete");
};

startMigration();
