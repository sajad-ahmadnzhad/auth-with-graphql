import { Request } from "express";
import sendError from "../utils/sendError.utils";
import { MiddlewaresMessages } from "./middlewares.message";
import httpStatus from "http-status";

export default (req: Request): void => {
  const { user } = req as any;

  if (user.role == "USER") {
    throw sendError(
      MiddlewaresMessages.PathOfAdmins,
      "FORBIDDEN",
      httpStatus.FORBIDDEN
    );
  }
};
