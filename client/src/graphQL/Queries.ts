import { gql } from "@apollo/client";

export const QUERY_USER_AVATAR = gql`
  query QueryUserByID {
    QueryUserByID {
      profileAvatar
    }
  }
`;

export const QUERY_TAGS = gql`
  query QueryAllCategories {
    QueryAllCategories {
      id
      category
    }
  }
`;
