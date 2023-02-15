const { users } = require("./User/User");
const { QueryUserByID } = require("./User/QueryUserByID");
const { createNewCategory } = require("./Category/CreateCategory");
const { createUser } = require("./User/CreateUser");
const { QueryUserBookmark } = require("./User/GetUserBookmark");
const { createEvent } = require("./Event/CreateEvent");
const { QueryAllCategories } = require("./Category/QueryCategories");
const { QueryEventsByCity } = require("./Event/QueryEventsByCity");
const { QueryEventById } = require("./Event/QueryEventById");
const { bookmarkEvent } = require("./Bookmark/BookmarkEvent");
const { unbookmarkEvent } = require("./Bookmark/UnbookmarkEvent");
const {
  QueryAllFrequencyTypes,
} = require("./Frequency/QueryAllFrequencyTypes");
const { isBookmarked } = require("./Bookmark/IsBookmarked");
const { queryUserBookmarks } = require("./Bookmark/QueryUserBookmarks");
const { createReview } = require("./Review/CreateReview");
const { removeReview } = require("./Review/DeleteReview");
const { login } = require("./User/LogIn");

export const resolvers = {
  Query: {
    users,
    isBookmarked,
    QueryAllCategories,
    QueryEventsByCity,
    QueryUserByID,
    queryUserBookmarks,
    QueryEventById,
    QueryAllFrequencyTypes,
  },
  Mutation: {
    createUser,
    removeReview,
    createReview,
    login,
    createEvent,
    createNewCategory,
    bookmarkEvent,
    unbookmarkEvent,
  },
};
