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

export const MAKE_PAYMENT = gql`
  mutation Mutation($input: TransactionInput!) {
    makeTransaction(input: $input)
  }
`;

export const MAKE_TICKETS = gql`
  mutation CreateTicket($input: CreateTicketInput!) {
    createTicket(input: $input)
  }
`;

export const CREATE_REVIEW = gql`
  mutation Mutation($input: ReviewInput!) {
    createReview(input: $input) {
      title
    }
  }
`;

export const BOOKMARK_EVENT = gql`
  mutation Mutation($input: BookmarkInput!) {
    bookmarkEvent(input: $input) {
      bookmarked
    }
  }
`;

export const UNBOOKMARK_EVENT = gql`
  mutation UnbookmarkEvent($input: BookmarkInput!) {
    unbookmarkEvent(input: $input) {
      bookmarked
    }
  }
`;
