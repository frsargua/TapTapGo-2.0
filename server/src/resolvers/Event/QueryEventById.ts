const {
  Events,
  ImageUrl,
  Category,
  Review,
  Address,
  User,
} = require("../../models/index");
import { GraphQLError } from "graphql";
import { CreateCategory } from "../types";

export const QueryEventById = async (_: any, { eventId }: any) => {
  try {
    const eventsFromDB = await Events.findByPk(eventId, {
      include: [
        ImageUrl,
        {
          model: Review,
          as: "review",
        },
        {
          model: User,
          as: "host",
          include: [{ model: Events, as: "parties" }],
        },
        {
          model: Address,
          as: "addresses",
          through: {
            attributes: [],
          },
        },
        {
          model: Category,
          as: "categories",
          through: {
            attributes: [],
          },
          include: [
            {
              model: Events,
              as: "eventsPerCategory",
              through: {
                attributes: [],
              },
              include: [
                ImageUrl,
                {
                  model: Review,
                  as: "review",
                },
              ],
            },
          ],
        },
      ],
    });

    console.log(eventsFromDB);

    return eventsFromDB;
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to get categories | ${err.original}`);
    throw new GraphQLError(`Failed to get categories | ${err.original}`);
  }
};
