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

  type ticketType {
    description: String!
    expirationDate: String!
    id: String!
    price: Int!
    ticketType: String!  
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
    ticketTypes:[ticketType]
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
 
  type Ticket {
    id:ID!
    reference: String
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

  type ResponseTransaction {
    completed: Boolean
    transactionId: String   
  }

  type ResponseTickets {
    tickets:[Ticket] 
  }

  type ResponsePaymentIntent {
    clientSecret:String! 
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

  input CreateTicketOption {
    description: String!
    expirationDate: String!
    id: String!
    price: Int!
    ticketName: String!
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
    ticketOptions:[CreateTicketOption]
  }

  input TransactionInput {
    amount:Int!
    paymentId:String!
  }
 
  input PaymentIntentInput {
    amount:Int!
  }

  input TransactionInput {
    amount:Int!
    paymentId:String!
  }

  input CreateTicketInput {
    details:TicketDetailsInput
    numberTicketsPurchased: Int!
  }

  input TicketDetailsInput {
     event_id: String!
  }

  input TicketUserRelationshipInput {
    tickets: [TicketsArrayInput]
    quantity: Int!
    transactionId: String!  
  }
 
  input TicketsArrayInput {
    id: ID!
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
    makeTransaction(input:TransactionInput!):ResponseTransaction
    createPaymentIntent(input:PaymentIntentInput!):ResponsePaymentIntent
    linkTicketsUsers(input:TicketUserRelationshipInput!):Boolean
    createTicket(input:CreateTicketInput!):ResponseTickets
  }
`;
