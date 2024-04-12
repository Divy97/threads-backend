import { ApolloServer } from "@apollo/server";
import { User } from "./users";

async function createApolloGraphqlServer() {
  // Create Graphql server
  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String
        }

        type Mutation {
            ${User.mutations}
        }
    `,
    resolvers: {
      Query: {
        hello: () => "Hey",
        ...User.resolvers.queries,
      }, 
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  // start gql server
  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
