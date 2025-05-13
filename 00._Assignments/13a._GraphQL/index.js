import { ApolloServer } from "@apollo/server";
import { gql } from "apollo-server";
import { readFileSync } from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers } from "./resolvers.js";

const schemaFile = readFileSync("./schema.graphql", "utf-8");
const typeDefs = gql(schemaFile);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  introspection: true,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

app.use("/graphql", cors(), express.json(), expressMiddleware(server));

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
  console.log(`Subscription endpoint at ws://localhost:${PORT}/graphql`);
});
