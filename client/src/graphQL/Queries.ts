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

export const QUERY_EVENTBYID = gql`
  query Query($eventId: ID!) {
    QueryEventById(eventId: $eventId) {
      eventName
      description
      date
      categories {
        category
      }
      ageGroup
      attendees
      maxAttendees
      image_urls {
        imageLink
      }
      price
      addresses {
        city
        firstLine
        latitude
        longitude
        postcode
        secondLine
      }
      host {
        username
        profileAvatar
        parties {
          eventName
        }
      }
      id
    }
  }
`;
