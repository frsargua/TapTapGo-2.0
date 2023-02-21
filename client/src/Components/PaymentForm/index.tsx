import React, { FunctionComponent, useState } from "react";
import {
  CardElement,
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { async } from "@firebase/util";
import { useMutation } from "@apollo/client";
import { MAKE_PAYMENT } from "../../graphQL/Mutations";

interface PaymentFormProps {}

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export const PaymentForm: FunctionComponent<PaymentFormProps> = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const [makePayment] = useMutation(MAKE_PAYMENT);
  const [makeTickets] = useMutation(MAKE_TICKETS);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;

        const { data } = await makePayment({
          variables: {
            input: {
              amount: 52,
              paymentId: id,
            },
          },
        });

        if (data) {
          console.log(data.makeTransaction);
          console.log("sucessfull payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>Pay</button>
          {/* <PaymentElement />
          <button disabled={!stripe}>Submit</button> */}
        </form>
      ) : (
        <div>
          <h2>Payment made</h2>
        </div>
      )}
    </>
  );
};
