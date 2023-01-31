const { Events, ImageUrl, Category, Address } = require("../../models/index");
import { GraphQLError } from "graphql";
import { CreateCategory } from "../types";

export const QueryEventById = async (_: any, { eventId }: any) => {
  try {
    const eventsFromDB = await Events.findByPk(eventId, {
      include: [
        ImageUrl,
        {
          model: Address,
          as: "addresses",
          attributes: [
            "id",
            "firstLine",
            "secondLine",
            "city",
            "latitude",
            "longitude",
            "postcode",
          ],
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
        },
      ],
    });

    return eventsFromDB;
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to get categories | ${err.original}`);
    throw new GraphQLError(`Failed to get categories | ${err.original}`);
  }
};
