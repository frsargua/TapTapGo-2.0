import { Container } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FunctionComponent, useEffect, useState } from "react";
import { PaymentForm } from "../PaymentForm";
import CheckoutForm from "../PaymentForm/CheckoutForm";
import { useMutation } from "@apollo/client";
import { MAKE_PAYMENT_INTENT } from "../../graphQL/Mutations";
import { func } from "prop-types";
interface StripeContainerProps {
  totalAmount: number;
}

const PUBLIC_KEY =
  "pk_test_51LJyctCiZXURSSBeQXYLyFKbJN7D1RtAJZ8I6qwwLW5WTTvJSe2FBngxYlESPC2cU7hjgfosWlQr4iNUHP1BR9CU00riMXLVbL";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export const StripeContainer: FunctionComponent<StripeContainerProps> = (
  props
) => {
  const [clientSecret, setClientSecret] = useState<string>("");

  const { totalAmount } = props;

  const [makePayment] = useMutation(MAKE_PAYMENT_INTENT);

  const paymentIntent = async () => {
    const { data } = await makePayment({
      variables: {
        input: {
          amount: totalAmount,
        },
      },
    });
    setClientSecret(data.createPaymentIntent.clientSecret);
  };

  useEffect(() => {
    paymentIntent();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripeTestPromise}>
          <Container maxWidth="xl">
            <CheckoutForm />
          </Container>
        </Elements>
      )}
    </>
  );
};
