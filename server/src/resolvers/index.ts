const { user } = require("./User/User");
const { createNewCategory } = require("./Category/CreateCategory");
const { createUser } = require("./User/CreateUser");
const { createEvent } = require("./Event/CreateEvent");
const { QueryAllCategories } = require("./Category/QueryCategory");
const { QueryEventsByCity } = require("./Event/QueryEventsByCity");
const { QueryEventById } = require("./Event/QueryEventById");
const { bookmarkEvent } = require("./Bookmark/BookmarkEvent");
const { unbookmarkEvent } = require("./Bookmark/UnbookmarkEvent");
const { login } = require("./User/LogIn");

export const resolvers = {
  Query: {
    user,
    QueryAllCategories,
    QueryEventsByCity,
    QueryEventById,
  },
  Mutation: {
    createUser,
    login,
    createEvent,
    createNewCategory,
    bookmarkEvent,
    unbookmarkEvent,
  },
};
