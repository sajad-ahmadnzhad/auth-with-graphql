import { gql } from "apollo-server-express";

export default gql`
  type User {
    _id: ID!
    name: String!
    username: String!
    email: String!
    role: String!
    isAcceptEmail: Boolean!
  }

  input DeleteAccountInput {
    password: String!
  }

  type DeleteAccountSuccess implements SuccessInterface {
    message: String!
    statusCode: Int!
  }

  input UpdateUserInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }

  type UpdateUserSuccess implements SuccessInterface {
    message: String!
    statusCode: Int!
  }

  type Query {
    myAccount: User!
  }

  type Mutation {
    deleteAccount(input: DeleteAccountInput!): DeleteAccountSuccess!
    updateUser(input: UpdateUserInput!): UpdateUserSuccess!
  }
`;
