import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SingleEventCard } from "../../Components/EventCard";

interface SearchProps {}

const Search: FunctionComponent<SearchProps> = () => {
  const [events, setEvents] = useState([
    {
      eventName: "hello",
      price: 255,
      reviews: [{ rating: 1 }, { rating: 2 }],
      images: [
        {
          imageLink:
            "https://loremflickr.com/cache/resized/65535_52577830222_746eec3195_b_640_480_nofilter.jpg",
        },
      ],
      _id: "12k",
      createdById: "12u",
    },
  ]);
  const { city } = useParams();

  function renderEvents() {
    if (events.length !== 0) {
      return events.map((el, i) => {
        return (
          <Grid key={i} item xs={11} sm={10} md={4} lg={3}>
            <SingleEventCard {...el} />
          </Grid>
        );
      });
    } else {
      return (
        <Stack>
          <Typography textAlign="center" variant="h2">
            No events in this area
          </Typography>
        </Stack>
      );
    }
  }

  return (
    <>
      <Box className="section__block-14">
        <Typography variant="h2" textAlign="center" my={4}>
          Events in <span style={{ fontWeight: "500" }}> {city}</span>
        </Typography>
        <Grid
          container
          mt="1rem"
          spacing={3}
          width="100%"
          className="section__block-4"
        >
          {renderEvents()}
        </Grid>
      </Box>
    </>
  );
};

export default Search;
