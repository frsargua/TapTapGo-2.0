const { TransactionTicket } = require("../../models/index");
const { v4: uuidv4 } = require("uuid");
import { GraphQLError } from "graphql";
import { CreateTicketUserRelationship } from "../types";

export const linkTicketsUsers = async (
  _: any,
  { input }: CreateTicketUserRelationship,
  context: UserType
) => {
  try {
    if (context.user) {
      for (let i = 0; i < input.tickets.length; i++) {
        console.log(input.tickets);

        let relationInput = {
          quantity: input.quantity,
          ticketId: input.tickets[i].id,
          userId: context.user.id,
          transactionId: input.transactionId,
        };
        let relation = await TransactionTicket.create(relationInput);
        if (!relation) return false;
      }
      return true;
    }
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to get categories | ${err.original}`);
    throw new GraphQLError(`Failed to get categories | ${err.original}`);
  }
};
