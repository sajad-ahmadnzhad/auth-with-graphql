import { gql } from "apollo-server";

export default gql`
  interface SuccessInterface {
    message: String!
    statusCode: Int!
  }

  input RegisterInput {
    name: String!
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    identifier: String!
    password: String!
  }

  input ForgotPassword {
    email: String!
  }

  input ResetPassword {
    email: String!
    code: Int!
    password: String!
    confirmPassword: String!
  }

  input SendVerifyEmail {
    email: String!
  }
  input VerifyEmail {
    email: String!
    code: String!
  }

  type LogoutSuccess implements SuccessInterface {
    message: String!
    statusCode: Int!
  }

  type RefreshTokenSuccess implements SuccessInterface {
    message: String!
    statusCode: Int!
    token: String!
  }

  type ForgotPasswordSuccess implements SuccessInterface {
    message: String!
    statusCode: Int!
  }

  type ResetPasswordSuccess implements SuccessInterface {
    message: String!
    statusCode: Int!
  }

  type SendVerifyEmailSuccess implements SuccessInterface {
    message: String!
    statusCode: Int!
  }

  type VerifyEmailSuccess implements SuccessInterface {
    message: String!
    statusCode: Int!
  }

  type Success implements SuccessInterface {
    message: String!
    statusCode: Int!
    token: String!
  }

  type Mutation {
    register(input: RegisterInput!): Success!
    login(input: LoginInput!): Success!
    forgotPassword(input: ForgotPassword!): ForgotPasswordSuccess!
    resetPassword(input: ResetPassword!): ResetPasswordSuccess!
    sendVerifyEmail(input: SendVerifyEmail!): SendVerifyEmailSuccess
    verifyEmail(input: VerifyEmail!): VerifyEmailSuccess
  }

  type Query {
    logout: LogoutSuccess!
    refreshToken: RefreshTokenSuccess!
  }
`;
