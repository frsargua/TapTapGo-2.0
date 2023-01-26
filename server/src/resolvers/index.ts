const { user } = require("./User/User");
const { createUser } = require("./User/CreateUser");
const { createEvent } = require("./Event/CreateEvent");
const { login } = require("./User/LogIn");

export const resolvers = {
  Query: {
    user,
  },
  Mutation: { createUser, login, createEvent },
};
