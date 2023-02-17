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
    reviews:[Review]
    bookmarked:[Event]
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

  type frequency {
    id: ID!
    frequency: String!
  }

  type Category {
    id: ID!
    category: String!
    eventsPerCategory:[Event]
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
    frequency: frequency
    maxAttendees: Int!
  }
  type EventForBookmark {
    id: ID!
    eventName: String
    description: String
    date: String
    price: Int
    city: String!
    ageGroup: String!
    host: User
    categories: [Category]
    averageRating:Int
    numberOfReviews:Int
    attendees: Int!
    frequency: frequency
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
    isBookmarked(input:BookmarkInput!):ResponseFromResolver
    QueryAllCategories:[Category]
    QueryEventsByCity(cityParam:String!):[Event]
    QueryEventById(eventId:ID!):Event
    queryUserBookmarks:[EventForBookmark]
    QueryUserByID:User
    QueryAllFrequencyTypes:[frequency]
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
    frequency: FrequencyInput
    maxAttendees: Int!
  }
  input FrequencyInput {
    frequency: String!
    id: ID!
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

  input TransactionInput {
    status:String!
    amount:Int!
    transactionId:String!
    paymentMethod:String!
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
    makeTransaction(input:TransactionInput!):Boolean
  }
`;
