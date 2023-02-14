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
        `SELECT events.id  , events.event_name  as eventName, events.description, events.date, events.price, events.age_group as ageGroup, events.attendees, events.max_attendees  as maxAttendess, events.host_id as hostId, events.frequency_id as frequencyId ,  AVG(review.rating) AS averageRating, COUNT(review.rating) AS numberOfReviews, event_address.address_id, address.city  FROM bookmark 
JOIN events ON events.id = bookmark.event_id 
LEFT JOIN review ON review.post_id = events.id 
LEFT JOIN event_address ON event_address.event_id = events.id 
LEFT JOIN address ON event_address.address_id = address.id 
WHERE user_id = :userId
GROUP BY
  events.id,event_address.address_id`,
        {
          replacements: { userId },
          type: QueryTypes.SELECT,
        }
      );

      return eventsFromDB;
    }
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to checked if bookmarked | ${err.original}`);
    throw new GraphQLError(`Failed to check if bookmarked| ${err.original}`);
  }
};
