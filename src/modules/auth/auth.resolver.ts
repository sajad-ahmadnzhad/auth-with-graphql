import httpStatus from "http-status";
import { RegisterBody, LoginBody } from "../../typings/auth.type";
import { registerService, loginService, logoutService } from "./auth.service";
import { Request, Response } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
export const registerResolver = {
  Query: {
    logout: async (
      _: any,
      args: any,
      { req, res }: { req: Request; res: Response }
    ) => {
      await authMiddleware(req, res);
      const { message } = await logoutService(req, res);
      return {
        statusCode: httpStatus.OK,
        message,
      };
    },
  },

  Mutation: {
    async register(_: any, { input }: { input: RegisterBody }) {
      const { accessToken, success } = await registerService(input);
      return {
        statusCode: httpStatus.CREATED,
        message: success,
        token: accessToken,
      };
    },
    async login(_: any, { input }: { input: LoginBody }) {
      const { accessToken, success } = await loginService(input);
      return {
        statusCode: httpStatus.OK,
        message: success,
        token: accessToken,
      };
    },
  },
};
