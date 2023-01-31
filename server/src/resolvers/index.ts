const { user } = require("./User/User");
const { createNewCategory } = require("./Category/CreateCategory");
const { createUser } = require("./User/CreateUser");
const { createEvent } = require("./Event/CreateEvent");
const { QueryAllCategories } = require("./Category/QueryCategory");
const { QueryEventsByCity } = require("./Event/QueryEventsByCity");
const { login } = require("./User/LogIn");

export const resolvers = {
  Query: {
    user,
    QueryAllCategories,
    QueryEventsByCity,
  },
  Mutation: { createUser, login, createEvent, createNewCategory },
};
