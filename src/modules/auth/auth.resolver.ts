import httpStatus from "http-status";
import {
  RegisterBody,
  LoginBody,
  ForgotPasswordBody,
  ResetPasswordBody,
  SendVerifyEmailBody,
  VerifyEmailBody,
} from "../../typings/auth.type";
import {
  registerService,
  loginService,
  logoutService,
  refreshTokenService,
  forgotPasswordService,
  resetPasswordService,
  sendVerifyEmailService,
  verifyEmailService,
} from "./auth.service";
import { Request, Response } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import validatorMiddleware from "../../middlewares/validator.middleware";
import { resetPasswordSchemaValidator } from "./auth.validator";
export const registerResolver = {
  Query: {
    async logout(
      _: any,
      args: any,
      { req, res }: { req: Request; res: Response }
    ) {
      await authMiddleware(req, res);
      const { message } = await logoutService(req);
      return {
        statusCode: httpStatus.OK,
        message,
      };
    },
    async refreshToken(_: any, args: any, { req }: { req: Request }) {
      const { accessToken, success } = await refreshTokenService(
        req.headers.authorization
      );

      return {
        token: accessToken,
        message: success,
        statusCode: httpStatus.OK,
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
    async forgotPassword(_: any, { input }: { input: ForgotPasswordBody }) {
      const success = await forgotPasswordService(input);
      return {
        message: success,
        statusCode: httpStatus.OK,
      };
    },
    async resetPassword(_: any, { input }: { input: ResetPasswordBody }) {
      await validatorMiddleware(input, resetPasswordSchemaValidator);
      const success = await resetPasswordService(input);

      return {
        message: success,
        statusCode: httpStatus.OK,
      };
    },
    async sendVerifyEmail(_: any, { input }: { input: SendVerifyEmailBody }) {
      const success = await sendVerifyEmailService(input);
      return {
        statusCode: httpStatus.OK,
        message: success,
      };
    },
    async verifyEmail(_: any, { input }: { input: VerifyEmailBody }) {
      const success = await verifyEmailService(input);
      return {
        statusCode: httpStatus.OK,
        message: success,
      };
    },
  },
};
