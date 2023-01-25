import { Request, Response } from "express";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { typeDefs } from "./typeDefs/index";
import { resolvers } from "./resolvers/index";
import sequelize from "./config/db";
const { authMiddleware } = require("./context/auth");

interface MyContext {
  token?: String;
}
const PORT = process.env.PORT || 3004;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  introspection: true,
  // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const init = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    await server.start();

    app.use(
      "/graphql",
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(server, {
        context: authMiddleware,
      })
    );

    await new Promise<void>((resolve) =>
      httpServer.listen({ port: PORT }, resolve)
    );

    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  } catch (err: unknown) {
    console.log(`Failed to initiate API server || ${(err as Error).message}`);
  }
};

init();
