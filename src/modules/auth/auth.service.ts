import {
  RegisterBody,
  RegisterOutput,
  LoginBody,
  LoginOutput,
} from "../../typings/auth.type";
import { registerSchemaValidator } from "./auth.validator";
import validatorMiddleware from "../../middlewares/validator.middleware";
import userModel from "../../models/user.model";
import sendError from "../../utils/sendError.utils";
import { AuthMessages } from "./auth.messages";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import redis from "../../configs/redis.config";
import { Request, Response } from "express";
export const registerService = async (
  input: RegisterBody
): Promise<RegisterOutput> => {
  await validatorMiddleware(input, registerSchemaValidator);
  const { name, username, email, password } = input;
  const redisClient = await redis;

  //* Check for existing user
  const existingUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw sendError(AuthMessages.ExistingUser, "CONFLICT", httpStatus.CONFLICT);
  }

  const isFirstUser = await userModel.countDocuments();

  let role = isFirstUser ? "USER" : "SUPER_ADMIN";

  const user = await userModel.create({
    name,
    username,
    email,
    password,
    role,
  });

  // * Generate access token
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.EXPIRE_ACCESS_TOKEN,
    }
  );
  //   * Generate refresh token
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.EXPIRE_REFRESH_TOKEN,
    }
  );

  await redisClient.set(user._id.toString(), refreshToken);

  return {
    accessToken,
    success: AuthMessages.RegisteredUserSuccess,
  };
};
export const loginService = async (input: LoginBody): Promise<LoginOutput> => {
  const { identifier, password } = input;
  const redisClient = await redis;
  //* Check existing User
  const user = await userModel.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });

  if (!user) {
    throw sendError(AuthMessages.NotFound, "NOTFOUND", httpStatus.NOT_FOUND);
  }

  const comparePassword = bcrypt.compareSync(password, user.password);

  if (!comparePassword) {
    throw sendError(
      AuthMessages.InvalidPassword,
      "UNAUTHORIZED",
      httpStatus.UNAUTHORIZED
    );
  }

  // * Generate access token
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.EXPIRE_ACCESS_TOKEN,
    }
  );

  // * Generate refresh token
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.EXPIRE_REFRESH_TOKEN,
    }
  );

  await redisClient.set(user._id.toString(), refreshToken);

  return {
    success: AuthMessages.LoginSuccess,
    accessToken,
  };
};
export const logoutService = async (req: Request, res: Response) => {
  const redisClient = await redis;
  res.removeHeader("Authorization");
  redisClient.del((req as any).user._id.toString());
  return { message: AuthMessages.LogoutSuccess };
};
