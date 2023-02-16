const { Category } = require("../../models/index");
import { GraphQLError } from "graphql";
import { CreateCategory } from "../types";

export const createNewCategory = async (_: any, { input }: CreateCategory) => {
  try {
    const category = await Category.create(input);

    return category;
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to category user | ${err.original}`);
    throw new GraphQLError(`Failed to category user | ${err.original}`);
  }
};
