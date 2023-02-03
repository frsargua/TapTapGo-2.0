import { gql } from "@apollo/client";

export const QUERY_USER_AVATAR = gql`
  query QueryUserByID {
    QueryUserByID {
      profileAvatar
    }
  }
`;
