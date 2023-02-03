const { User } = require("../../models/index");
import { GraphQLError } from "graphql";

export const users = async () => {
  try {
    const userFromDatabase = await User.findAll({ include: { all: true } });

    return userFromDatabase;
  } catch (err) {
    console.log(`[ERROR]: Failed to get users | ${(err as Error).message}`);
    throw new GraphQLError("Failed to get users");
  }
};
