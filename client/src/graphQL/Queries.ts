import { gql } from "@apollo/client";

export const QUERY_USER_AVATAR = gql`
  query QueryUserByID {
    QueryUserByID {
      profileAvatar
    }
  }
`;

export const GET_PROFILEDATA = gql`
  query QueryUserByID {
    QueryUserByID {
      firstName
      lastName
      id
      profileAvatar
      parties {
        id
        eventName
        review {
          title
        }
        image_urls {
          imageLink
        }
        attendees
      }
      bookmarked {
        id
        eventName
        price
        attendees
        maxAttendees
        review {
          rating
          username
          title
          reviewText
        }
        image_urls {
          imageLink
        }
      }
      username
      email
      number
      aboutMe
      age
      addresses {
        firstLine
        latitude
        postcode
      }
      createdAt
      websiteUrl
      reviews {
        title
        reviewText
        rating
        username
      }
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
      ticketTypes {
        description
        expirationDate
        id
        price
        ticketType
      }
      categories {
        category
        eventsPerCategory {
          id
          eventName
          image_urls {
            imageLink
          }
          price
          review {
            rating
          }
        }
      }
      ageGroup
      attendees
      maxAttendees
      image_urls {
        imageLink
      }

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

export const QUERY_EVENT_TICKET_OPTIONS = gql`
  query Query($eventId: ID!) {
    QueryEventById(eventId: $eventId) {
      ticketTypes {
        description
        expirationDate
        id
        price
        ticketType
      }
      image_urls {
        imageLink
      }
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
      addresses {
        city
        firstLine
        latitude
        longitude
        postcode
        secondLine
      }
    }
  }
`;

export const ISBOOKMARK_EVENT = gql`
  query Query($input: BookmarkInput!) {
    isBookmarked(input: $input) {
      bookmarked
    }
  }
`;

export const QUERY_USER_BOOKMARKS = gql`
  query QueryUserBookmarks {
    queryUserBookmarks {
      id
      price
      attendees
      date
      eventName
      numberOfReviews
      averageRating
      ageGroup
      city
    }
  }
`;

export const QUERY_FREQUENCY_TYPES = gql`
  query QueryAllFrequencyTypes {
    QueryAllFrequencyTypes {
      frequency
      id
    }
  }
`;
