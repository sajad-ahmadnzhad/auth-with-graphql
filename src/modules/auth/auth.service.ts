import { RegisterBody, RegisterOutput } from "../../typings/auth.type";
import { registerSchemaValidator } from "./auth.validator";
import validatorMiddleware from "../../middlewares/validator.middleware";
import userModel from "../../models/user.model";
import sendError from "../../utils/sendError.utils";
import { AuthMessages } from "./auth.messages";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
export const registerService = async (
  input: RegisterBody
): Promise<RegisterOutput> => {
  await validatorMiddleware(input, registerSchemaValidator);
  const { name, username, email, password } = input;

  //* Check for existing user
  const existingUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    sendError(AuthMessages.ExistingUser, "CONFLICT", httpStatus.CONFLICT);
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
  // * Generate refresh token
  //   const refreshToken = jwt.sign(
  //     { id: user._id },
  //     process.env.JWT_SECRET as string,
  //     {
  //       expiresIn: process.env.EXPIRE_REFRESH_TOKEN,
  //     }
  //   );

  //   await redisClient.set(user._id.toString(), refreshToken);

  return {
      accessToken,
      success: AuthMessages.RegisteredUserSuccess
  };
};
