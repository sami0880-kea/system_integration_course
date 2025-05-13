import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connection = new sqlite3.Database(
  path.join(__dirname, "../webhooks.db"),
  err => {
    if (err) {
      console.error("Error connecting to database:", err);
      return;
    }
    console.log("Connected to SQLite database");
  }
);

connection.serialize(() => {
  connection.run(`
        CREATE TABLE IF NOT EXISTS webhooks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            events TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

export default connection;
