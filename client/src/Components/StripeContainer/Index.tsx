import { Container } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "../PaymentForm";

interface StripeCintainerProps {}

const PUBLIC_KEY =
  "pk_live_51LJyctCiZXURSSBe4gkWf4pHwbykF9LN73BO5a3P4OfoPbhGkMPBBb7XBiHSY6tdvYNFpy8ypThp8zyVaikCO9Vu00gNgUELZ6";

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
