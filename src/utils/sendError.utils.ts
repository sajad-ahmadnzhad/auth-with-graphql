import { GraphQLError } from "graphql";

export default (message: string, code: string, statusCode: number) => {
  return new GraphQLError(message, {
    extensions: {
      code,
      http: {
        status: statusCode,
      },
    },
  });
};
