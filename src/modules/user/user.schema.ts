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

type Query {
    myAccount: User!
}

`;
