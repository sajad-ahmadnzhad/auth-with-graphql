import { GraphQLError } from "graphql";

export default (message: string, code: string, statusCode: number): void => {
  throw new GraphQLError(message, {
    extensions: {
      code,
      statusCode,
    },
  });
};
