const { gql } = require("@apollo/server");

export const typeDefs = `
  type User {
    id: Int
    firstName: String
    lastName: String
    username: String
    address: String
    age: Int
    createdAt: String
    profileAvatar: String
    aboutMe: String
    websiteUrl: String
    number: String
    email: String
    password: String
  }
  type Query {
    user: [User]
  }

  type Auth {
    token: ID!
    user: User
  }

  input CreateUserInput {
    firstName: String
    lastName: String
    username: String
    number: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
  
  type Mutation {
    createUser(input: CreateUserInput!): Auth
    login(input: LoginInput!): Auth
  }
`;
