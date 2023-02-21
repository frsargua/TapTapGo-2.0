const { Ticket } = require("../../models/index");
const { v4: uuidv4 } = require("uuid");
import { GraphQLError } from "graphql";
import { CreateTicketType, UserType } from "../types";

export const createTicket = async (
  _: any,
  { input }: CreateTicketType,
  context: UserType
) => {
  try {
    console.log(input);

    if (context.user) {
      let tickets = [];
      for (let i = 0; i < input.numberTicketsPurchased; i++) {
        let newTicketDetails = {
          eventId: input.details.event_id,
          qrCode: uuidv4(),
          reference: uuidv4(),
        };
        let ticketCreated = await Ticket.create(newTicketDetails);
        tickets.push(ticketCreated);
      }
      if (tickets.length > 0) return true;
      return false;
    }
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to get categories | ${err.original}`);
    throw new GraphQLError(`Failed to get categories | ${err.original}`);
  }
};
