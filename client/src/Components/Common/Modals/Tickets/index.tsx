import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import { FunctionComponent, useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../../contexts/ModalContext";
import { Container } from "@mui/system";
import { func } from "prop-types";
import { StripeContainer } from "../../../StripeContainer/Index";
import Ticket from "./Ticket";
import { Description } from "@mui/icons-material";

interface GetTIcketModalProps {}

export const GetTicketModal: FunctionComponent<GetTIcketModalProps> = () => {
  const { closeTicketModalState } = useContext(ModalContext);
  const [readyToCheckout, setReadyToCheckout] = useState<boolean>(false);

  const fakeData = [
    {
      ticketTypeId: 1,
      price: 12,
      description: "none",
      ticketName: "standard",
    },
    {
      ticketTypeId: 2,
      price: 22,
      description: "This is a description",
      ticketName: "premium",
    },
  ];

  const [total, setTotal] = useState<number>(0);
  const [numberOfTickets, setNumberOfTickets] = useState<{
    [key: string]: {
      ticketTypeId: string;
      quantity: number;
      price: number;
      ticketName: string;
    };
  }>({});

  const updateTicketNumbers = (
    quantity: number,
    id: number,
    price: number,
    ticketName: string
  ) => {
    setNumberOfTickets((prev) => {
      console.log(quantity);
      if (quantity <= 0) {
        delete prev[id];
        return { ...prev };
      } else {
        return {
          ...prev,
          [id]: {
            ticketTypeId: id,
            quantity: quantity,
            price: price,
            ticketName: ticketName,
          },
        };
      }
    });
  };

  const calculateTotal = () => {
    console.log(numberOfTickets);

    if (numberOfTickets) {
      const sum = Object.keys(numberOfTickets).reduce(
        (acc, key) =>
          acc + numberOfTickets[key].quantity * numberOfTickets[key].price,
        0
      );

      setTotal((prev) => sum);
    }
  };

  const checkout = () => {
    setReadyToCheckout(true);
  };

  const goBackToTicketOptions = () => {
    setReadyToCheckout(false);
  };

  const renderOrderSummary = () => {
    const transformedData = Object.entries(numberOfTickets).map(
      ([key, value]) => (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1">
            {value.quantity} x {value.ticketName}
          </Typography>
          <Typography variant="body1" sx={{ mx: "1rem" }}>
            £{value.quantity * value.price}
          </Typography>
        </Box>
      )
    );
    return transformedData;
  };
  useEffect(() => {
    calculateTotal();
  }, [numberOfTickets]);

  return (
    <>
      <Box
        onClick={closeTicketModalState}
        sx={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 999,
          position: "fixed",
          top: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: "70%", height: "700px", mx: "auto" }}>
          <Grid
            container
            columnSpacing={0}
            sx={{ height: "100%", width: "100%", m: "auto" }}
          >
            <Grid item xs={12} md={6} lg={8}>
              <Container maxWidth="md">
                <Typography
                  variant="h5"
                  textAlign="center"
                  sx={{ marginY: "1rem" }}
                >
                  Title
                </Typography>
                <Typography variant="body2" textAlign="center" gutterBottom>
                  Date
                </Typography>
                <Divider sx={{ marginBottom: "1.5rem" }} />
                {!readyToCheckout && (
                  <>
                    <TextField
                      placeholder="Promo Code"
                      fullWidth
                      sx={{ marginY: "0.5rem" }}
                    />
                    {fakeData.map((el) => (
                      <Ticket
                        ticketTypeId={el.ticketTypeId}
                        price={el.price}
                        description={el.description}
                        ticketName={el.ticketName}
                        updateTicketNumbers={updateTicketNumbers}
                      />
                    ))}
                  </>
                )}
                {readyToCheckout && <StripeContainer totalAmount={total} />}
              </Container>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              sx={{
                backgroundColor: "#F8F7FA",
                height: "100%",
                position: "relative",
              }}
            >
              <Typography
                component="img"
                sx={{ width: "100%" }}
                src="https://i.ytimg.com/vi/mI_-1tbIXQI/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBFuPLHraz1fiuH0e39gykCQR4NCA"
              />

              <CardContent>
                <Typography
                  variant="body1"
                  fontWeight={700}
                  gutterBottom
                  sx={{ marginBottom: "1rem" }}
                >
                  Order summary
                </Typography>
                <Box
                  sx={{
                    my: "1rem",
                  }}
                >
                  {renderOrderSummary()}
                </Box>
                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    my: "1rem",
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    Subtotal
                  </Typography>
                  <Typography variant="body1" sx={{ mx: "1rem" }}>
                    {total}
                  </Typography>
                </Box>
                <Divider />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    variant="h6"
                    fontWeight={500}
                    gutterBottom
                    sx={{ marginY: "1rem" }}
                  >
                    Total
                  </Typography>
                  <Typography variant="body1" sx={{ my: "1rem", mx: "1rem" }}>
                    {total}
                  </Typography>
                </Box>
              </CardContent>
              <CardContent
                sx={{ position: "absolute", bottom: "0", width: "100%" }}
              >
                {!readyToCheckout ? (
                  <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    onClick={checkout}
                  >
                    Checkout
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    onClick={goBackToTicketOptions}
                  >
                    Go Back
                  </Button>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};
