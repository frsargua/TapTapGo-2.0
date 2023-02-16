const { User, Events, ImageUrl, Review } = require("../../models/index");
import { GraphQLError } from "graphql";
import { EventType, UserType } from "../types";

export const QueryUserByID = async (_: any, __: any, context: UserType) => {
  try {
    const userFromDatabase = await User.findByPk(context.user.id, {
      include: [
        { model: Review, as: "reviews" },
        {
          model: Events,
          as: "parties",
          include: [
            ImageUrl,
            {
              model: Review,
              as: "review",
            },
          ],
        },
        {
          model: Events,
          as: "bookmarked",
          through: "bookmark",
          include: [{ model: Review, as: "review" }, ImageUrl],
        },
      ],
    });

    console.log(userFromDatabase.bookmarked);

    return userFromDatabase;
  } catch (err) {
    console.log(`[ERROR]: Failed to get user | ${(err as Error).message}`);
    throw new GraphQLError("Failed to get user");
  }
};
