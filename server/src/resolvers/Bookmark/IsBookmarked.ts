const { Review } = require("../../models/index");
import { GraphQLError } from "graphql";
import sequelize from "../../config/db";
import { UserType } from "../types";
const { QueryTypes } = require("sequelize");

export const isBookmarked = async (
  _: any,
  { input }: { input: { eventId: string } },
  context: UserType
) => {
  try {
    if (context.user) {
      const userId = context.user.id;
      const eventId = input.eventId;
      // const eventFromDB = await Review.findOne({
      //   where: { user_id: context.user.id, event_id: input.eventId },
      // });

      const eventFromDB = await sequelize.query(
        "SELECT * FROM bookmark WHERE user_id = :userId AND event_id = :eventId",
        {
          replacements: { userId, eventId },
          type: QueryTypes.SELECT,
        }
      );

      if (eventFromDB[0]) return { bookmarked: true };
      return { bookmarked: false };
    }
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to checked if bookmarked | ${err.original}`);
    throw new GraphQLError(`Failed to check if bookmarked| ${err.original}`);
  }
};
