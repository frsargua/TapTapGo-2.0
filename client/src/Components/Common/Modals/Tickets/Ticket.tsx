import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { FunctionComponent, useContext, useEffect, useState } from "react";

interface TicketProps {
  ticketTypeId: string;
  price: number;
  description: string;
  ticketName: string;
  updateTicketNumbers: (
    quantity: number,
    id: string,
    price: number,
    ticketName: string
  ) => void;
}

const Ticket: FunctionComponent<TicketProps> = (props) => {
  const { ticketTypeId, price, description, ticketName, updateTicketNumbers } =
    props;
  const [numberOfTickets, setNumberOfTickets] = useState<number>(0);

  const increaseTicketNumber = () => {
    setNumberOfTickets((prev) => prev + 1);
  };
  const decreaseTicketNumber = () => {
    if (numberOfTickets > 0) {
      setNumberOfTickets((prev) => prev - 1);
    }
  };

  useEffect(() => {
    updateTicketNumbers(numberOfTickets, ticketTypeId, price, ticketName);
  }, [numberOfTickets]);

  return (
    <>
      <Card sx={{ marginY: "1.2rem" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "1rem",
            }}
          >
            <Typography variant="h6">{ticketName}</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <IconButton onClick={decreaseTicketNumber}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="h5" sx={{ mx: "0.5rem" }}>
                {numberOfTickets}
              </Typography>
              <IconButton color="primary" onClick={increaseTicketNumber}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          <Divider />

          <Typography variant="h6">£ {price}</Typography>
          <Typography variant="caption" gutterBottom>
            Date
          </Typography>

          <Typography variant="body2" marginTop="1rem">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Ticket;
