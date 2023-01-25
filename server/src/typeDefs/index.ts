const { gql } = require("@apollo/server");
import { startStandaloneServer } from "@apollo/server/standalone";

export const typeDefs = `#graphql
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
`;
