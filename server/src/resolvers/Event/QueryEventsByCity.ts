const { Events, ImageUrl, Category, Address } = require("../../models/index");
import { GraphQLError } from "graphql";
import { CreateCategory } from "../types";

export const QueryEventsByCity = async (_: any, { cityParam }: any) => {
  try {
    // console.log(cityParam);

    const categories = await Address.findAll({
      where: { city: cityParam },
      include: [
        {
          model: Events,
          as: "events",
          through: {
            attributes: [],
          },

          include: [
            ImageUrl,
            {
              model: Category,
              as: "categories",
              attributes: ["id", "category"],
              through: {
                attributes: [],
              },
            },
            {
              model: Address,
              as: "addresses",
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
    });

    return categories[0].events;
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to get categories | ${err.original}`);
    throw new GraphQLError(`Failed to get categories | ${err.original}`);
  }
};
