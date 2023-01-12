import { Box, Grid, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { SingleEventCard } from "../../Components/EventCard";
import { MapPage } from "./MapPage";
import { dataList } from "../../Constants/Index";

interface MapProps {}

export const Map: FunctionComponent<MapProps> = () => {
  return (
    <>
      <Grid
        container
        columnSpacing={2}
        sx={{ width: "100vw", height: "calc(100vh - 68px)" }}
      >
        <Grid item xs={12} md={8} lg={9}>
          <MapPage />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          sx={{
            overflowY: "scroll",
            overflowX: "hidden",
            width: "100%",
            height: "100%",
          }}
        >
          {dataList.map((el, i) => {
            return (
              <>
                <Box sx={{ width: "99%" }} margin="10px">
                  <SingleEventCard {...el} />
                </Box>
              </>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};
