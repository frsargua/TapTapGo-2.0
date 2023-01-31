const {
  Events,
  ImageUrl,
  Category,
  Review,
  User,
} = require("../../models/index");
import { GraphQLError } from "graphql";
import { UserType } from "../types";

export const removeReview = async (
  _: any,
  { input }: any,
  context: UserType
) => {
  try {
    if (context.user) {
      const removedReview = await Review.destroy({
        where: {
          id: input.reviewId,
        },
      });

      if (!removedReview) {
        throw new GraphQLError("Review already deleted.", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }

      return removedReview;
    }
  } catch (err: any) {
    console.log(`[ERROR]: Failed to delete review | ${err.message}`);
    throw new GraphQLError(`Failed to delete review | ${err.message}`);
  }
};
