import knexfile from "./knexfile.js";
import knex from "knex";

const sourceDb = knex(knexfile.mysql);
const targetDb = knex(knexfile.pg);

try {
  const users = await sourceDb("users").select("*");

  for (const user of users) {
    await targetDb("users").insert({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  }

  console.log("Migration completed successfully.");
} catch (error) {
  console.error("Migration failed:", error);
} finally {
  await sourceDb.destroy();
  await targetDb.destroy();
}
