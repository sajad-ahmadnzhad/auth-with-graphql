import httpStatus from "http-status";
import { RegisterBody } from "../../typings/auth.type";
import { registerService } from "./auth.service";
import { Response } from "express";
export const registerResolver = {
  Query: {
    hello: () => "Hello, World!",
  },
  Mutation: {
    async register(
      _: any,
      { input }: { input: RegisterBody },
      { res }: { res: Response }
    ) {
      const { accessToken, success } = await registerService(input);
      res.cookie("accessToken", accessToken);
      return {
        statusCode: httpStatus.CREATED,
        message: success,
      };
    },
  },
};
