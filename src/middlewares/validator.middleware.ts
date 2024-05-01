import httpStatus from "http-status";
import Joi from "joi";
import sendErrorUtils from "../utils/sendError.utils";
export default async (data: any, schema: Joi.Schema) => {
  try {
    await schema.validateAsync(data);
  } catch (error: any) {
   throw sendErrorUtils(error.message, "BAD_REQUEST", httpStatus.BAD_REQUEST);
  }
};
