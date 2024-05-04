import { Request, Response } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import { DeleteAccountBody } from "../../typings/user.type";
import { deleteAccountService } from "./user.service";
import httpStatus from "http-status";

export default {
  Query: {
    myAccount: async (
      _: any,
      __: any,
      { req, res }: { req: Request; res: Response }
    ) => {
      await authMiddleware(req, res);
      return (req as any).user;
    },
  },

  Mutation: {
    deleteAccount: async (
      _: any,
      { input }: { input: DeleteAccountBody },
      { req, res }: { req: Request; res: Response }
    ) => {
      await authMiddleware(req, res);

      const success = await deleteAccountService(input, req);

      return {
        message: success,
        statusCode: httpStatus.OK,
      };
    },
  },
};
