import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";
import Auth from "../../utils/auth";

interface LocationCardProps {
  eventData: {
    eventName: string;
    date: string;
    price: number;
    addresses: {
      firstLine: string;
      secondLine: string;
      city: string;
      postcode: string;
    }[];
  };
  handlePurchase: () => void;
  isAttending: boolean;
  openModal: () => void;
  updateAttendance: () => void;
}

export const LocationCard: FunctionComponent<LocationCardProps> = (props) => {
  let logged = Auth.loggedIn();
  let { eventData, handlePurchase, isAttending, openModal, updateAttendance } =
    props;

  function renderActionButton() {
    const isAttendingRender = isAttending ? (
      <Button
        onClick={updateAttendance}
        sx={{
          display: { xs: "none", md: "block" },
          marginTop: "3rem",
          marginX: "auto",
          width: "250px",
          height: "50px",
        }}
        variant="contained"
        color="warning"
      >
        Cancel Attendance
      </Button>
    ) : (
      <Button
        onClick={handlePurchase}
        sx={{
          display: { xs: "none", md: "block" },
          marginTop: "3rem",
          marginX: "auto",
          width: "250px",
          height: "50px",
        }}
        variant="contained"
        color="warning"
      >
        Going
      </Button>
    );

    return logged ? (
      isAttendingRender
    ) : (
      <Button
        onClick={openModal}
        sx={{
          display: { xs: "none", md: "block" },
          marginTop: "3rem",
          marginX: "auto",
          width: "250px",
          height: "50px",
        }}
        variant="contained"
        color="primary"
      >
        Log In to Buy
      </Button>
    );
  }

  return (
    <Card sx={{ mt: "1rem", mb: "1rem" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" fontWeight="600">
          {eventData.eventName}
        </Typography>
        <Typography variant="h6" component="h2" fontWeight="600">
          {eventData.date}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" component="h2" textAlign="right">
              £ {eventData.price} / person
            </Typography>
          </Grid>
        </Grid>
        <Paper
          elevation={1}
          sx={{ width: "100%", height: "1px", my: "1rem" }}
        />
        <Typography variant="h6" component="h2">
          {eventData.addresses[0].firstLine}
        </Typography>
        <Typography variant="h6" component="h2">
          {eventData.addresses[0].secondLine}
        </Typography>
        <Typography variant="h6" component="h2">
          {eventData.addresses[0].city}
        </Typography>
        <Typography variant="h6" component="h2">
          {eventData.addresses[0].postcode}
        </Typography>
        {renderActionButton()}
      </CardContent>
    </Card>
  );
};
