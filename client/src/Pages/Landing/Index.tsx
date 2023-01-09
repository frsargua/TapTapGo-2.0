import { Grid, TextField, Typography } from "@mui/material";

interface LandingProps {}

export const Landing: FunctionComponent<LandingProps> = () => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={7}>
          <Typography variant="h1">Hobbies Everywhere</Typography>
          <TextField />
        </Grid>
        <Grid item xs={12} md={7}></Grid>
      </Grid>
      {/* Title */}
      {/* Search */}
      {/* Hero */}
    </>
  );
};
