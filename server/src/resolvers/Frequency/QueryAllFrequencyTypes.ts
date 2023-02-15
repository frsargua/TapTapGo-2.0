const { Frequency } = require("../../models/index");
import { GraphQLError } from "graphql";

export const QueryAllFrequencyTypes = async (_: any, __: any) => {
  try {
    const frequencies = await Frequency.findAll({});

    return frequencies;
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to get frequencies | ${err.original}`);
    throw new GraphQLError(`Failed to get frequencies | ${err.original}`);
  }
};
