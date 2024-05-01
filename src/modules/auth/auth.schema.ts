import { gql } from "apollo-server";

export const registerSchema = gql`
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

  type LogoutSuccess implements SuccessInterface {
    message: String!
    statusCode: Int!
  }

  type RefreshTokenSuccess implements SuccessInterface {
    message: String!
    statusCode: Int!
    token: String!
  }

  input ForgotPassword {
    email: String!
  }

  type ForgotPasswordSuccess implements SuccessInterface {
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
    forgotPassword(input: ForgotPassword!): ForgotPasswordSuccess
  }

  type Query {
    logout: LogoutSuccess!
    refreshToken: RefreshTokenSuccess!
  }
`;
