const { User } = require("../../models/index");
import { GraphQLError } from "graphql";
import { UserType } from "../types";
const { signToken } = require("../../context/auth");

export const login = async (_: any, { input }: UserType) => {
  try {
    const { email, password } = input;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      throw new GraphQLError("Failed to logIn", {
        extensions: {
          code: "UNAUTHENTICATED",
        },
      });
    }

    const correctPassword = await user.checkPassword(password);

    if (!correctPassword) {
      throw new GraphQLError("Failed to logIn", {
        extensions: {
          code: "UNAUTHENTICATED",
        },
      });
    }

    console.log("You have successfully logged in");

    const token = signToken(user);

    return {
      token,
      user,
    };
  } catch (err: any) {
    console.log(`[ERROR]: Failed to login | ${err.message}`);
    throw new GraphQLError(`[ERROR]: Failed to login | ${err.message}`, {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }
};
