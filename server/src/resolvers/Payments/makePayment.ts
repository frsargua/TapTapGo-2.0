const { Transaction } = require("../../models/index");
import { GraphQLError } from "graphql";
import { MakePaymentType, UserType } from "../types";
const stripe = require("stripe")(
  "sk_test_51LJyctCiZXURSSBeQQ7m2HTERwh9JNr5xFWnB3xytU053hk1AbZqKuQaemkgBfG609PwSzltvwOktVlDDRlDHxpK00KRi4YGRz"
);

export const makeTransaction = async (
  _: any,
  { input }: MakePaymentType,
  context: UserType
) => {
  try {
    if (context.user) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: input.amount,
        currency: "gbp",
        payment_method: input.paymentId,
        confirm: true,
      });
      const { id: transactionReference, amount } = paymentIntent;

      let transationInput = {
        status: paymentIntent ? "paid" : "failed",
        amount,
        transactionId: transactionReference,
        payment_method: "stripe",
        user_id: context.user.id,
      };

      const transation = await Transaction.create(transationInput);

      if (transation) return true;
      return false;
    }
  } catch (err: any) {
    console.log(err);
    console.log(`[ERROR]: Failed to create transation| ${err.original}`);
    throw new GraphQLError(`Failed to create transation | ${err.original}`);
  }
};
