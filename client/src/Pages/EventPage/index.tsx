import { useState, useEffect, useContext, FunctionComponent } from "react";

import { LocationCard } from "../../Components/EventPage/LocationCard";
import { HostInfoCard } from "../../Components/EventPage/HostInforCard";
import { ImageCarousel } from "../../Components/EventPage/ImageCarousel";
import { DescriptionSection } from "../../Components/EventPage/DescriptionSection";
import { ReviewSection } from "../../Components/EventPage/ReviewSection";
import { SuggestionsSection } from "../../Components/EventPage/SuggestionsSection";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import { Container, Typography } from "@mui/material";

import { ModalContext } from "../../contexts/ModalContext";
import { useParams } from "react-router-dom";
import { singleEvent } from "../../Constants/Index";
import { URLParamsTypes } from "../../utils/types";
import { EventMapComponent } from "../../Components/EventPage/EventMapComponent";

import { useQuery } from "@apollo/client";
import { QUERY_EVENTBYID } from "../../graphQL/Queries";

interface EventPageProps {
  id: number;
  checked: boolean;
  label: string;
}

export const EventPage: FunctionComponent<EventPageProps> = () => {
  const { openSignModal } = useContext(ModalContext);
  const { eventId: eventParam } = useParams<URLParamsTypes>();

  const [isAttendingState, setIsAttendingState] = useState<boolean>(false);
  const [eventData, setEventData] = useState<any>(singleEvent);
  const [eventSection, setEventSection] = useState("Description");
  const [loading, setLoading] = useState<boolean>(false);

  const handlePurchase = async () => {
    setIsAttendingState(true);
  };

  const updateAttendance = async () => {
    setIsAttendingState(false);
  };

  function renderSection() {
    if (eventSection === "Description") {
      return <DescriptionSection eventData={eventData} />;
    }

    if (eventSection === "Reviews") {
      return (
        <ReviewSection
          eventId={eventParam as string}
          reviewsArray={eventData.review}
        />
      );
    }

    if (eventSection === "Suggestions") {
      return <SuggestionsSection suggestedEvents={eventData.categories} />;
    }

    return <DescriptionSection eventData={eventData} />;
  }

  async function updateState(info: any) {
    await setEventData(info);
    await setLoading((prev) => !prev);
  }

  const { data } = useQuery(QUERY_EVENTBYID, {
    variables: { eventId: eventParam },
  });

  useEffect(() => {
    if (data?.QueryEventById) {
      updateState(data.QueryEventById);
    }
  }, [data]);

  return !loading ? (
    <Typography variant="h3" marginTop="6rem">
      loading
    </Typography>
  ) : (
    <Container maxWidth="xl">
      <Grid container spacing={3} sx={{ mt: "1rem", mb: "10rem" }}>
        <Grid item xs={12} sm={5} lg={3} sx={{ order: { xs: "2", md: "1" } }}>
          <Stack>
            <LocationCard
              eventData={eventData}
              handlePurchase={handlePurchase}
              isAttending={isAttendingState}
              openModal={openSignModal}
              updateAttendance={updateAttendance}
            />
            <EventMapComponent location={eventData.addresses[0]} />
            <HostInfoCard hostData={eventData.host} />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={7} lg={9} sx={{ order: { xs: "1", md: "2" } }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ImageCarousel images={eventData.image_urls} />
            <Button
              onClick={handlePurchase}
              sx={{
                display: { xs: "block", md: "none" },
                marginTop: "3rem",
                marginX: "auto",
                width: "250px",
                height: "50px",
              }}
              variant="contained"
              color="error"
            >
              Get Tickets
            </Button>
            <Grid container spacing={2} justifyContent="center" mt="3rem">
              <Grid item xs={3}>
                <Button
                  onClick={() => setEventSection("Description")}
                  fullWidth
                  variant="contained"
                >
                  Description
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={() => setEventSection("Reviews")}
                  fullWidth
                  variant="contained"
                >
                  Reviews
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={() => setEventSection("Suggestions")}
                  fullWidth
                  variant="contained"
                >
                  Similar Events
                </Button>
              </Grid>
            </Grid>
            {renderSection()}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
