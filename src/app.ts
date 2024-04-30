import { ApolloServer, gql } from "apollo-server";
import { config } from "dotenv";
import mainSchema from './main.schema'
config({ path: __dirname + "/../.env" });

const server = new ApolloServer({
  typeDefs: mainSchema ,
  // resolvers: {}
});

(async () => {
  const PORT = Number(process.env.PORT as string);
  await server.listen({ port: PORT });
  console.log(`Server running on port ${PORT}`);
})();
