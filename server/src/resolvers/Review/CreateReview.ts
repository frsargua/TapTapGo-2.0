const {
  Events,
  ImageUrl,
  Category,
  Review,
  User,
} = require("../../models/index");
import { GraphQLError } from "graphql";
import { UserType } from "../types";

export const createReview = async (
  _: any,
  { input }: ReviewType,
  context: UserType
) => {
  try {
    if (context.user) {
      let newInput = {
        ...input,
        username: context.user.username,
        creator_id: context.user.id,
      };
      const createdReview = await Review.create(newInput);

      return createdReview;
    }
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to get categories | ${err.original}`);
    throw new GraphQLError(`Failed to get categories | ${err.original}`);
  }
};
