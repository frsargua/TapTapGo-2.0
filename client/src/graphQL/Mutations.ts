import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Mutation($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        firstName
      }
      token
    }
  }
`;
