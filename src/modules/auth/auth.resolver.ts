import httpStatus from "http-status";
import { RegisterBody } from "../../typings/auth.type";
import { registerService } from "./auth.service";
export const registerResolver = {
  Query: {
    hello: () => "Hello, World!",
  },
  Mutation: {
    async register(
      _: any,
      { input }: { input: RegisterBody },
    ) {
      const { accessToken, success } = await registerService(input);
      return {
        statusCode: httpStatus.CREATED,
        message: success,
        token: accessToken
      };
    },
  },
};
