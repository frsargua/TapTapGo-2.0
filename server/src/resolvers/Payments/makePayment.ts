const { Transaction } = require("../../models/index");
import { GraphQLError } from "graphql";
import { MakePaymentType, UserType } from "../types";

export const makeTransaction = async (
  _: any,
  { input }: MakePaymentType,
  context: UserType
) => {
  try {
    console.log(context);
    if (context.user) {
      console.log(input);
      let newInput = {
        ...input,
        user_id: context.user.id,
      };
      const transation = await Transaction.create(newInput);
      if (transation) return true;
      return false;
    }
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to create transation| ${err.original}`);
    throw new GraphQLError(`Failed to create transation | ${err.original}`);
  }
};
