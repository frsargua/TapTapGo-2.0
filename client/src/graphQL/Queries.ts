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
        eventsPerCategory {
          eventName
          image_urls {
            imageLink
          }
          price
        }
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
      review {
        rating
        reviewText
        title
        username
      }
      id
    }
  }
`;

export const SEARCH_EVENTS_CITY = gql`
  query QueryEventsByCity($cityParam: String!) {
    QueryEventsByCity(cityParam: $cityParam) {
      eventName
      price
      id
      image_urls {
        imageLink
      }
      review {
        rating
      }
      categories {
        category
        id
      }
      frequency {
        frequency
      }
    }
  }
`;
