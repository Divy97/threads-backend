import express from "express";

import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8080;

  app.use(express.json());
  const gqlServer = await createApolloGraphqlServer();
  app.use("/graphql", expressMiddleware(gqlServer));
  app.get("/", (req, res) => {
    res.send("Home");
  });

  app.listen(PORT, () => {
    console.log("server is running");
  });
}

startServer();
