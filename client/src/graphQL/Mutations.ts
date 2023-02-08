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
      id
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

export const CREATE_REVIEW = gql`
  mutation Mutation($input: ReviewInput!) {
    createReview(input: $input) {
      title
    }
  }
`;
