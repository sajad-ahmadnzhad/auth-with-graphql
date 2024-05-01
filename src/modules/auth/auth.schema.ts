import { gql } from "apollo-server";

export const registerSchema = gql(`

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

    type Success implements SuccessInterface {
        message: String!
        statusCode: Int!
        token: String!
    }

    
type Mutation {
    register(input: RegisterInput!): Success! 
    login(input: LoginInput!): Success!
}

type Query {
    hello: String
}

`);
