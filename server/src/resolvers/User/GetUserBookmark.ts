const {
  Events,
  ImageUrl,
  Category,
  Address,
  User,
} = require("../../models/index");
import { GraphQLError } from "graphql";
import { CreateCategory } from "../types";

export const QueryUserBookmark = async (_: any, __: any, context: UserType) => {
  try {
    if (context.user) {
      const eventsFromDB = await User.findByPk(context.user.id, {
        include: [
          {
            model: Events,
            as: "bookmarked",
            through: {
              attributes: [],
            },
          },
        ],
      });

      return eventsFromDB.bookmarked;
    }
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to get categories | ${err.original}`);
    throw new GraphQLError(`Failed to get categories | ${err.original}`);
  }
};
