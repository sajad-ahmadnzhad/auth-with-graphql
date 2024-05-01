import { Request, Response } from "express";
import { MiddlewaresMessages } from "./middlewares.message";
import userModel from "../models/user.model";
import sendError from "../utils/sendError.utils";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  const accessToken = authorization?.split(" ")[1];

  if (!accessToken) {
    throw sendError(
      MiddlewaresMessages.ProtectedPath,
      "FORBIDDEN",
      httpStatus.FORBIDDEN
    );
  }
  const checkToken = jwt.verify(accessToken, process.env.JWT_SECRET as string);

  const user = await userModel
    .findById((checkToken as any).id)
    .select("-password");

  if (!user) {
    throw sendError(
      MiddlewaresMessages.NotFoundUser,
      "NOTFOUND",
      httpStatus.NOT_FOUND
    );
  }

  if (!user.isAcceptEmail) {
    throw sendError(
      MiddlewaresMessages.RequiredAcceptEmail,
      "FORBIDDEN",
      httpStatus.FORBIDDEN
    );
  }

  (req as any).user = user;
};
