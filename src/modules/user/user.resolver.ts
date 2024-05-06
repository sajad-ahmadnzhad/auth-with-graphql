import { Request, Response } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import { DeleteAccountBody, UpdateBody } from "../../typings/user.type";
import {
  deleteAccountService,
  removeService,
  updateService,
} from "./user.service";
import httpStatus from "http-status";
import validatorMiddleware from "../../middlewares/validator.middleware";
import { updateSchemaValidator } from "./user.validator";
import isAdminMiddleware from "../../middlewares/isAdmin.middleware";

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
    updateUser: async (
      _: any,
      { input }: { input: UpdateBody },
      { req, res }: { req: Request; res: Response }
    ) => {
      await authMiddleware(req, res);
      await validatorMiddleware(input, updateSchemaValidator);

      const success = await updateService(input, req);

      return {
        message: success,
        statusCode: httpStatus.OK,
      };
    },
    removeUser: async (
      _: any,
      { userId }: { userId: string },
      { req, res }: { req: Request; res: Response }
    ) => {
      await authMiddleware(req, res);
      isAdminMiddleware(req);
      const success = await removeService(userId, req);

      return {
        message: success,
        statusCode: httpStatus.OK,
      };
    },
  },
};
