import { RegisterBody } from "./auth.type";
import { ObjectId } from "mongoose";

export interface IUser {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
  profile_pic: string;
  role: string;
  isAcceptEmail: boolean;
}

export interface AcceptParams {
  id: string;
}

export interface RejectParams extends AcceptParams {}
export interface RemoveParams extends AcceptParams {}
export interface UpdateBody extends Omit<RegisterBody, "confirmPassword"> {}
export interface ChangeSuperAdminBody {
  password: string;
}

export interface RemoveBody extends ChangeSuperAdminBody {}

export interface DeleteAccountBody extends ChangeSuperAdminBody {}
