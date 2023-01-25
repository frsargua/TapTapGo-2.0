const User = require("../../models/User");
import { GraphQLError } from "graphql";
import Sequelize from "sequelize/types/sequelize";
import { UserType } from "../types";
const { signToken } = require("../../context/auth");

export const createUser = async (_: any, { input }: UserType) => {
  try {
    const user = await User.create(input);
    const token = signToken(user);

    return {
      token,
      user,
    };
  } catch (err: any) {
    console.log(`[ERROR]: Failed to create user | ${err.original}`);
    throw new GraphQLError(`Failed to create user | ${err.original}`);
  }
};
