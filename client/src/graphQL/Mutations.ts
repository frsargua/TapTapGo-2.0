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

export const ADD_EVENT = gql`
  mutation Mutation($input: newEventInput!) {
    createEvent(input: $input) {
      addresses {
        city
      }
      image_urls {
        imageLink
      }

      categories {
        category
        id
      }
    }
  }
`;
