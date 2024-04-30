import { gql } from "apollo-server";

export const registerSchema = gql(`

    input RegisterInput {
        name: String!
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    type Success {
        message: String!
        statusCode: Int!
    }
    
type Mutation {
    register(input: RegisterInput!): Success!
        
}

type Query {
    hello: String
}

`);
