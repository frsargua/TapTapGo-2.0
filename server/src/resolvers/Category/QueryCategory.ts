const { Category, Events } = require("../../models/index");
import { GraphQLError } from "graphql";
import { CreateCategory } from "../types";

export const QueryAllCategories = async (_: any, __: any) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Events,
          as: "eventsPerCategory",
          through: {
            attributes: [],
          },
        },
      ],
    });

    return categories;
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to get categories | ${err.original}`);
    throw new GraphQLError(`Failed to get categories | ${err.original}`);
  }
};
