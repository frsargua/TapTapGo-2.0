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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../../contexts/ModalContext";
import { Container } from "@mui/system";
import { func } from "prop-types";

interface GetTIcketModalProps {}

export const GetTicketModal: FunctionComponent<GetTIcketModalProps> = () => {
  const { closeTicketModalState } = useContext(ModalContext);

  const [numberOfTickets, setNumberOfTickets] = useState<number>(0);

  const increaseTicketNumber = () => {
    setNumberOfTickets((prev) => prev + 1);
  };
  const decreaseTicketNumber = () => {
    if (numberOfTickets > 0) {
      setNumberOfTickets((prev) => prev - 1);
    }
  };

  const calculateTotal = (): number => {
    let total = numberOfTickets * 15;

    return total;
  };

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
                <TextField
                  placeholder="Promo Code"
                  fullWidth
                  sx={{ marginY: "0.5rem" }}
                />
                <Card sx={{ marginY: "1.2rem" }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: "1rem",
                      }}
                    >
                      <Typography variant="h6">Standard Pass</Typography>

                      <Box
                        sx={{
                          display: "flex",

                          alignItems: "center",
                        }}
                      >
                        <IconButton onClick={decreaseTicketNumber}>
                          <RemoveIcon />
                        </IconButton>
                        <Typography
                          variant="h5"
                          textAlign="center"
                          sx={{ mx: "0.5rem" }}
                        >
                          {numberOfTickets}
                        </Typography>
                        <IconButton
                          color="primary"
                          onClick={increaseTicketNumber}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Divider />

                    <Typography variant="h6">Price</Typography>
                    <Typography variant="caption" gutterBottom>
                      Date
                    </Typography>

                    <Typography variant="body2" marginTop="1rem">
                      This will be a description
                    </Typography>
                  </CardContent>
                </Card>
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
                    display: "flex",
                    justifyContent: "space-between",
                    my: "1rem",
                  }}
                >
                  <Typography variant="body1">
                    {numberOfTickets} x Standard Pass
                  </Typography>
                  <Typography variant="body1" sx={{ mx: "1rem" }}>
                    £ {calculateTotal()}
                  </Typography>
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
                    £ {calculateTotal()}
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
                    £ {calculateTotal()}
                  </Typography>
                </Box>
              </CardContent>
              <CardContent
                sx={{ position: "absolute", bottom: "0", width: "100%" }}
              >
                <Button variant="contained" fullWidth color="secondary" sx={{}}>
                  Pay
                </Button>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};
