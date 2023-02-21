import { Container } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "../PaymentForm";

interface StripeCintainerProps {}

const PUBLIC_KEY =
  "pk_test_51LJyctCiZXURSSBeQXYLyFKbJN7D1RtAJZ8I6qwwLW5WTTvJSe2FBngxYlESPC2cU7hjgfosWlQr4iNUHP1BR9CU00riMXLVbL";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export const StripeCintainer: FunctionComponent<StripeCintainerProps> = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <Container maxWidth="xl">
        <PaymentForm />
      </Container>
    </Elements>
  );
};
