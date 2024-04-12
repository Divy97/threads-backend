import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./lib/db";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8080;

  // Create Graphql server
  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
      }
      type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
      }
    `, // schema
    resolvers: {
      Query: {
        hello: () => "Hey",
      },
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        ) => {
          await prismaClient.user.create({
            data: {
              firstName,
              lastName,
              email,
              password,
              salt: "random_salt",
            },
          });
          return true;
        },
      },
    },
  });
  

  // start gql server
  await gqlServer.start();
  app.use(express.json());
  app.use("/graphql", expressMiddleware(gqlServer));
  app.get("/", (req, res) => {
    res.send("Home");
  });

  app.listen(PORT, () => {
    console.log("server is running");
  });
}

startServer();
