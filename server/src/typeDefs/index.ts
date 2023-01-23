const { gql } = require("@apollo/server");
import { startStandaloneServer } from "@apollo/server/standalone";

export const typeDefs = `#graphql
  type User {
    id: Int
    name: String
    age: Int
  }
  type Query {
    user: [User]
  }
`;
