import { Stack } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { SingleEventCard } from "../Common/EventCard/index";
import React, { FunctionComponent, useEffect } from "react";

interface SuggestionsSectionProps {
  suggestedEvents: { tagName: string; events: any[] }[];
}

export const SuggestionsSection: FunctionComponent<SuggestionsSectionProps> = (
  props
) => {
  const [randomEventSuggestion, setRandomEventSuggestion] = React.useState<
    any[]
  >([]);

  let { suggestedEvents } = props;
  useEffect(() => {
    if (suggestedEvents.length !== 0) {
      console.log(suggestedEvents.length);
      const randomTagData =
        suggestedEvents[Math.floor(Math.random() * suggestedEvents.length)]
          .eventsPerCategory;

      if (randomTagData.length !== 0) {
        setRandomEventSuggestion(randomTagData);
      }
    }
  }, []);

  return (
    <>
      <Stack width="100%">
        <Typography
          variant="h3"
          fontWeight="600"
          style={{ marginTop: "50px", textAlign: "center" }}
        >
          Similar Events
        </Typography>
        <Grid
          container
          mt="1rem"
          spacing={3}
          width="100%"
          justifyContent="center"
          className="section__block-4"
        >
          {randomEventSuggestion.map((el, i) => {
            return (
              <Grid key={i} item xs={11} sm={10} md={4} lg={3}>
                <SingleEventCard {...el} />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </>
  );
};
