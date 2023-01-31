const { User, Events } = require("../../models/index");
import { GraphQLError } from "graphql";
import { UserType } from "../types";

export const unbookmarkEvent = async (
  _: any,
  { input }: { input: { eventId: string } },
  context: UserType
) => {
  try {
    if (context.user) {
      const eventFromDB = await Events.findByPk(input.eventId);

      const userFromDB = await User.findByPk(context.user.id);

      await userFromDB.removeBookmarked(eventFromDB);
      return { bookmarked: true };
    }
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to bookmark | ${err.original}`);
    throw new GraphQLError(`Failed to bookmark| ${err.original}`);
  }
};
