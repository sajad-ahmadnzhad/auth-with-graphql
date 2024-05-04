import { Request } from "express";
import userModel from "../../models/user.model";
import { DeleteAccountBody } from "../../typings/user.type";
import bcrypt from "bcrypt";
import sendError from "../../utils/sendError.utils";
import { UserMessages } from "./user.message";
import httpStatus from "http-status";
import redis from "../../configs/redis.config";

export const deleteAccountService = async (
  input: DeleteAccountBody,
  req: Request
): Promise<string> => {
  const { password } = input;
  const redisClient = await redis;
  const user = await userModel.findById((req as any).user._id);

  const comparePassword = bcrypt.compareSync(password, user!.password);

  if (!comparePassword) {
    throw sendError(
      UserMessages.InvalidPassword,
      "BAD_REQUEST",
      httpStatus.BAD_REQUEST
    );
  }

  await user?.deleteOne();
  await redisClient.del(user!._id.toString());

  return UserMessages.DeleteAccountSuccess;
};
