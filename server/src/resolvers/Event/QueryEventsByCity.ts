const { Events, ImageUrl, Review, Address } = require("../../models/index");
import { GraphQLError } from "graphql";
import { CreateCategory } from "../types";

export const QueryEventsByCity = async (_: any, { cityParam }: any) => {
  try {
    const eventsByCity = await Events.findAll({
      include: [
        ImageUrl,

        {
          model: Review,
          as: "review",
        },
        {
          model: Address,
          as: "addresses",
          through: {
            attributes: [],
          },
          where: { city: cityParam },
        },
      ],
    });

    return eventsByCity;
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to get events | ${err.original}`);
    throw new GraphQLError(`Failed to get events | ${err.original}`);
  }
};
