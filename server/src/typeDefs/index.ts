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
    password: String
  }

  type Image {
    imageLink: String!
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
    hostId: User
    image_urls: [Image]
    categories: [Category]
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
    user: [User]
    QueryAllCategories:[Category]
    QueryEventsByCity(cityParam:String!):[Event]
    QueryEventById(eventId:ID!):Event
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
  input CreateCategory {
    id: ID!
  }
  input CreateNewCategory {
    category: String!
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
  }
`;
