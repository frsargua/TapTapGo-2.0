const { User } = require("../../models/index");
import { GraphQLError } from "graphql";

export const user = async () => {
  try {
    const userFromDatabase = await User.findAll({ include: { all: true } });
    console.log(userFromDatabase.id);
    return userFromDatabase;
  } catch (err) {
    console.log(`[ERROR]: Failed to get user | ${(err as Error).message}`);
    throw new GraphQLError("Failed to get user");
  }
};
