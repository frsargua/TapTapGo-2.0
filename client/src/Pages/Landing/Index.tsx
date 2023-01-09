import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import SearchByTagBar from "./SearchByTagBar";
import { SearchLocation } from "./SeachLocationBar";

interface LandingProps {}

export const Landing: FunctionComponent<LandingProps> = () => {
  const [tags, setTags] = React.useState<{ title: string }[]>([
    { title: "salsa" },
    { title: "Bachata" },
  ]);

  const [searchTag, setSearchTag] = React.useState<string>("");
  const [city, setCity] = React.useState<string>("");

  function handleTagChange(value: string) {
    setSearchTag(value);
  }

  function handleAddress(city: string) {
    setCity(city);
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={7}>
          <Typography variant="h1">Hobbies Everywhere</Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <SearchLocation updateLocation={handleAddress} />
            </Grid>
            <Grid item xs={12} md={6}>
              <SearchByTagBar
                updateTag={handleTagChange}
                category={tags}
                inputLabel="Select a category"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7}></Grid>
      </Grid>

      {/* Hero */}
    </>
  );
};
