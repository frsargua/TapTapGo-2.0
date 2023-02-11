import { Card, CardContent, Grid, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface HostInfoCardProps {
  hostData: {
    profileAvatar: string;
    username: string;
    myEvents: any[];
    parties: any[];
  };
}

export const HostInfoCard: FunctionComponent<HostInfoCardProps> = (props) => {
  let {
    hostData: { profileAvatar, username, parties },
  } = props;

  return (
    <Card>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          fontWeight="600"
          textAlign="center"
        >
          About your host
        </Typography>
        <Typography
          sx={{
            height: "100px",
            borderRadius: "50%",
            marginX: "33%",
            marginY: "2rem",
          }}
          component="img"
          src={profileAvatar}
        />

        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6">Hosted by</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6"> {username}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6">Events Hosted:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">{parties.length}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
