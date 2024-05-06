import { Request } from "express";
import userModel from "../../models/user.model";
import { DeleteAccountBody, UpdateBody } from "../../typings/user.type";
import bcrypt from "bcrypt";
import sendError from "../../utils/sendError.utils";
import { UserMessages } from "./user.message";
import httpStatus from "http-status";
import redis from "../../configs/redis.config";
import { isValidObjectId } from "mongoose";

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
export const updateService = async (
  input: UpdateBody,
  req: Request
): Promise<string> => {
  const { user } = req as any;
  const redisClient = await redis;
  const foundUser = await userModel.findOne({
    $or: [
      { email: input.email, _id: { $ne: user._id } },
      { username: input.username, _id: { $ne: user._id } },
    ],
  });

  if (foundUser) {
    throw sendError(
      UserMessages.AlreadyExists,
      "CONFLICT",
      httpStatus.CONFLICT
    );
  }

  if (user.email !== input.email) {
    await userModel.findByIdAndUpdate(user._id, { isAcceptEmail: false });
    await redisClient.del(user._id.toString());
  }

  const hashPassword = bcrypt.hashSync(input.password, 10);

  await userModel.findByIdAndUpdate(user._id, {
    ...input,
    password: hashPassword,
  });

  return UserMessages.UpdatedUserSuccess;
};
export const removeService = async (
  userId: string,
  req: Request
): Promise<string> => {
  const admin = (req as any).user;

  if (!isValidObjectId(userId)) {
    throw sendError(
      UserMessages.NotMongodbId,
      "BAD_REQUEST",
      httpStatus.BAD_REQUEST
    );
  }

  const user = await userModel.findById(userId);

  if (!user) {
    throw sendError(UserMessages.NotFound, "NOTFOUND", httpStatus.NOT_FOUND);
  }

  if (user.role == "ADMIN" && admin.role !== "SUPER_ADMIN") {
    throw sendError(
      UserMessages.CannotRemoveAdmin,
      "FORBIDDEN",
      httpStatus.FORBIDDEN
    );
  }

  if (user.role == "SUPER_ADMIN") {
    throw sendError(
      UserMessages.CannotRemoveSuperAdmin,
      "FORBIDDEN",
      httpStatus.FORBIDDEN
    );
  }

  await user.deleteOne();

  return UserMessages.RemovedUser;
};
