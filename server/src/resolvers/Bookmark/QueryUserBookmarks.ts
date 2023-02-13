const { Review } = require("../../models/index");
import { GraphQLError } from "graphql";
import sequelize from "../../config/db";
import { UserType } from "../types";
const { QueryTypes } = require("sequelize");

export const queryUserBookmarks = async (
  _: any,
  __: any,
  context: UserType
) => {
  try {
    if (context.user) {
      const userId = context.user.id;

      const eventsFromDB = await sequelize.query(
        `SELECT events.id  , events.event_name  as eventName, events.description, events.date, events.price, events.age_group as ageGroup, events.attendees, events.max_attendees  as maxAttendess, events.host_id as hostId, events.frequency_id as frequencyId ,  AVG(review.rating) AS averageRating, COUNT(review.rating) AS numberOfReviews  FROM bookmark 
JOIN events ON events.id = bookmark.event_id 
LEFT JOIN review ON review.post_id = events.id 
WHERE user_id = 1
GROUP BY
  events.id`,
        {
          replacements: { userId },
          type: QueryTypes.SELECT,
        }
      );

      console.log(eventsFromDB);

      return eventsFromDB;
    }
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to checked if bookmarked | ${err.original}`);
    throw new GraphQLError(`Failed to check if bookmarked| ${err.original}`);
  }
};
