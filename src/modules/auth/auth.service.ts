import {
  RegisterBody,
  RegisterOutput,
  LoginBody,
  LoginOutput,
  RefreshTokenAuthorization,
  RefreshTokenOutput,
  ForgotPasswordBody,
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
import tokenModel from "../../models/token.model";
import { randomBytes } from "crypto";
import sendMail from "../../utils/sendMail.utils";
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
  await redisClient.del((req as any).user._id.toString());
  return { message: AuthMessages.LogoutSuccess };
};
export const refreshTokenService = async (
  authorization: string | undefined
): Promise<RefreshTokenOutput> => {
  const accessToken = authorization?.split(" ")[1]?.trim();
  const redisClient = await redis;
  if (!accessToken) {
    throw sendError(
      AuthMessages.RequiredAccessToken,
      "BAD_REQUEST",
      httpStatus.BAD_REQUEST
    );
  }

  const accessTokenPayload = jwt.decode(accessToken);

  if (!accessTokenPayload || !(accessTokenPayload as any)?.id) {
    throw sendError(
      AuthMessages.InvalidAccessToken,
      "BAD_REQUEST",
      httpStatus.BAD_REQUEST
    );
  }

  const userRefreshToken = await redisClient.get(
    (accessTokenPayload as any).id
  );

  if (!userRefreshToken) {
    throw sendError(
      AuthMessages.NotFoundRefreshToken,
      "NotFound",
      httpStatus.NOT_FOUND
    );
  }

  jwt.verify(userRefreshToken, process.env.JWT_SECRET as string);

  // * Generate access token
  const newAccessToken = jwt.sign(
    { id: (accessTokenPayload as any).id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.EXPIRE_ACCESS_TOKEN,
    }
  );

  return {
    accessToken: newAccessToken,
    success: AuthMessages.CreatedNewAccessToken,
  };
};
export let forgotPasswordService = async (
  input: ForgotPasswordBody
): Promise<string> => {
  const { email } = input;

  const user = await userModel.findOne({ email });
  if (!user) {
    throw sendError(AuthMessages.NotFound, "NOTFOUND", httpStatus.NOT_FOUND);
  }
  
  const existingToken = await tokenModel.findOne({ userId: user._id });
  
  if (existingToken) {
    throw sendError(AuthMessages.AlreadySendEmail, "CONFLICT", httpStatus.CONFLICT);
  }

  const token = await tokenModel.create({
    userId: user._id,
    token: randomBytes(32).toString("hex"),
  });

  const mailOptions = {
    from: process.env.GMAIL_USER as string,
    to: email,
    subject: "reset your password",
    html: `<p>Link to reset your password:</p>
      <h1>Click on the link below to reset your password</h1>
      <h2>${process.env.BASE_URL}/v1/auth/${user._id}/reset-password/${token.token}</h2>
       `,
  };

  sendMail(mailOptions);

  return AuthMessages.SendLinkForResetPassword;
};
