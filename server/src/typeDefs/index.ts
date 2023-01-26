const { gql } = require("@apollo/server");

export const typeDefs = `
  type User {
    id: Int
    firstName: String
    lastName: String
    username: String
    address: String
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

  type Tag {
    _id: ID!
    tagName: String!
    events: [Event]
  }
  

  type Event {
    id: ID!
    eventName: String
    location: LocationEvent
    description: String
    date: String
    price: Int
    ageGroup: String!
    createdById: User
    image_urls: [Image]
    tags: [Tag]
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

  input newEventInput {
    eventData:CreateEventInput
    eventAddress:EventAddress
    eventImages:[InputImage]
    eventTags:[ID]
  }
  
  type Mutation {
    createUser(input: CreateUserInput!): Auth
    createEvent(input: newEventInput!): Event
    login(input: LoginInput!): Auth
  }
`;
