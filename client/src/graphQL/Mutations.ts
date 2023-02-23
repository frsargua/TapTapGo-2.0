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
  mutation MakeTransaction($input: TransactionInput!) {
    makeTransaction(input: $input) {
      completed
      transactionId
    }
  }
`;
export const MAKE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($input: PaymentIntentInput!) {
    createPaymentIntent(input: $input) {
      clientSecret
    }
  }
`;

export const MAKE_TICKETS = gql`
  mutation CreateTicket($input: CreateTicketInput!) {
    createTicket(input: $input) {
      tickets {
        id
      }
    }
  }
`;

export const LINK_TICKETS_USERS = gql`
  mutation LinkTicketsUsers($input: TicketUserRelationshipInput!) {
    linkTicketsUsers(input: $input)
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
