import { ApolloServer } from "apollo-server";
import { config } from "dotenv";
import mainSchema from "./main.schema";
import mainResolvers from "./main.resolvers";
config({ path: __dirname + "/../.env" });
import "./configs/mongodb.config";
const server = new ApolloServer({
  typeDefs: mainSchema,
  resolvers: mainResolvers,
});

(async () => {
  const PORT = Number(process.env.PORT as string);
  await server.listen({ port: PORT });
  console.log(`Server running on port ${PORT}`);
})();
