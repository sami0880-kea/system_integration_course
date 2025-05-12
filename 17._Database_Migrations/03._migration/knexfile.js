import dotenv from "dotenv";
dotenv.config();

const config = {
  mysql: {
    client: "mysql2",
    connection: {
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.MYSQL_HOST,
      port: 3307,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
  pg: {
    client: "pg",
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: 5432,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
};

export default config;
