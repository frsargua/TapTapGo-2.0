const { gql } = require("@apollo/server");

export const typeDefs = `
  type User {
    id: Int
    firstName: String
    lastName: String
    username: String
    addresses: [LocationEvent]
    age: Int
    createdAt: String
    profileAvatar: String
    aboutMe: String
    websiteUrl: String
    number: String
    email: String
    parties:[Event]
    password: String
  }

  type Image {
    imageLink: String!
  }
 
  type Review {
    username: String!
    title: String!
    reviewText: String!
    rating: Int!
  }

  type Category {
    id: ID!
    category: String!
  }
  

  type Event {
    id: ID!
    eventName: String
    addresses: [LocationEvent]
    description: String
    date: String
    price: Int
    ageGroup: String!
    host: User
    image_urls: [Image]
    categories: [Category]
    review:[Review]
    attendees: Int!
    maxAttendees: Int!
  }

  type LocationEvent {
    firstLine: String!
    secondLine: String
    city: String!
    latitude: String!
    longitude: String!
    postcode: String!
  }

  type Query {
    users: [User]
    QueryAllCategories:[Category]
    QueryEventsByCity(cityParam:String!):[Event]
    QueryEventById(eventId:ID!):Event
    QueryUserBookmark:[Event]
    QueryUserByID:User
  }

  type ResponseFromResolver {
    bookmarked: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  input CreateUserInput {
    firstName: String
    lastName: String
    username: String
    number: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input InputImage {
    imageLink: String!
  }

  input EventAddress {
    firstLine: String!
    secondLine: String
    city: String!
    latitude: String!
    longitude: String!
    postcode: String!
  }

  input CreateEventInput {
    eventName: String!
    description: String
    date: String!
    price: Int!
    ageGroup: String
    maxAttendees: Int!
  }

  input ReviewInput {
    title: String!
    reviewText: String!
    rating: Int!
    post_id: ID!
  }

  input removeReviewInput {
    reviewId: ID!
  }

  input CreateCategory {
    id: ID!
  }
  input CreateNewCategory {
    category: String!
  }

  input BookmarkInput {
    eventId: ID!
  }

  input newEventInput {
    eventData:CreateEventInput
    eventAddress:EventAddress
    eventImages:[InputImage]
    eventCategories:[CreateCategory]
  }
  
  type Mutation {
    createUser(input: CreateUserInput!): Auth
    createEvent(input: newEventInput!): Event
    login(input: LoginInput!): Auth
    createNewCategory(input:CreateNewCategory!):Category
    bookmarkEvent(input:BookmarkInput!):ResponseFromResolver
    unbookmarkEvent(input:BookmarkInput!):ResponseFromResolver
    createReview(input:ReviewInput!):Review
    removeReview(input:removeReviewInput!):Review
  }
`;
