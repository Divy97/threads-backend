import express from "express";
import { ApolloServer } from "@apollo/server";
import {
  expressMiddleware,
} from "@apollo/server/express4";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8080;

  // Create Graphql server
  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            
        }
    `, // schema
    resolvers: {}, // 
  });

  // start gql server
  await gqlServer.start();
  app.use(express.json())
  app.use("/graphql", expressMiddleware(gqlServer));
  app.get("/", (req, res) => {
    res.send("Home");
  });

  app.listen(PORT, () => {
    console.log("server is running");
  });
}

startServer();
