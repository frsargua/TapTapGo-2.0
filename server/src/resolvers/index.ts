const { user } = require("./User/User");
const { createUser } = require("./User/CreateUser");

export const resolvers = {
  Query: {
    user,
  },
  Mutation: { createUser },
};
