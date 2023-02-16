import e from "express";
import { GraphQLError } from "graphql";
import { EventType, UserType } from "../types";
const { Events, Address, ImageUrl, Category } = require("../../models/index");

export const createEvent = async (
  _: any,
  { input }: EventType,
  context: UserType
): Promise<any> => {
  try {
    if (context.user) {
      const { eventData, eventAddress, eventImages, eventCategories } = input;
      let finalInput = { ...eventData, frequency: eventData.frequency.id };
      const createdEvent = await Events.create({
        ...finalInput,
        host_id: context.user.id,
      });

      await Promise.all(
        eventImages.map(async (image) => {
          return await ImageUrl.create({
            imageLink: image.imageLink,
            event_id: createdEvent.id,
          });
        })
      );

      await Promise.all(
        eventCategories.map(
          async (category: { id: number; category: string }) => {
            let categoryFromDB = await Category.findByPk(category.id);
            await createdEvent.addCategory(categoryFromDB);
          }
        )
      );

      const { firstLine, city, postcode } = eventAddress;

      let addressFromDB = await Address.findOne({
        where: { firstLine, city, postcode },
      });

      if (addressFromDB) {
        await createdEvent.addAddress(addressFromDB);
      } else {
        let address = await Address.create(eventAddress);
        await createdEvent.addAddress(address);
      }

      const eventFromDB = await Events.findOne({
        where: { id: createdEvent.id },
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
            attributes: ["id", "category"],
            through: {
              attributes: [],
            },
          },
        ],
      });

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
