import { GraphQLError } from "graphql";
import { EventType, UserType } from "../types";
const { User, EventDetails, Address, ImageUrl } = require("../../models/index");

export const createEvent = async (
  _: any,
  { input }: EventType,
  context: UserType
): Promise<any> => {
  try {
    if (context.user) {
      const { eventData, eventAddress, eventImages } = input;
      const { id: hostId } = context.user;
      const newEventData = { ...eventData, hostId: hostId };
      const createdEvent = await EventDetails.create(newEventData);
      const { id: eventId } = createdEvent;

      await Promise.all(
        eventImages.map(async (image) => {
          return await ImageUrl.create({
            imageLink: image.imageLink,
            eventId: eventId,
          });
        })
      );

      let address = await Address.create(eventAddress);

      createdEvent.addAddress(address);

      const eventFromDB = await EventDetails.findByPk(eventId, {
        include: { all: true },
      });

      console.log(eventFromDB);

      return eventFromDB;
    } else {
      throw new GraphQLError("You must be a host to create an event.", {
        extensions: {
          code: "UNAUTHENTICATED",
        },
      });
    }
  } catch (err) {
    console.log(err);
    console.log(`[ERROR]: Failed to create event | ${(err as Error).message}`);
    throw new GraphQLError("Failed to create event.");
  }
};
