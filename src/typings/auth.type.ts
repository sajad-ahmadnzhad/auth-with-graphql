import { Schema } from "mongoose";
export interface RegisterBody {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  national_code: string;
  isColleague: string;
}

export interface LoginBody {
  identifier: string;
  password: string;
}

export interface ForgotPasswordBody {
  email: string;
}
export interface SendMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
  userId?: Schema.Types.ObjectId;
}

export interface ResetPasswordParams {
  id: string;
  token: string;
}

export interface ResetPasswordBody {
  password: string;
}

export interface RegisterOutput {
  success: string;
  accessToken: string;
}

export interface LoginOutput extends RegisterOutput {}
export interface RefreshTokenOutput
  extends Omit<RegisterOutput, "refreshToken"> {}

export interface SendVerifyEmailBody {
  email: string;
}

export interface VerifyEmailParams {
  id: string;
  token: string;
}

export interface RefreshTokenCookies {
  accessToken: string;
}