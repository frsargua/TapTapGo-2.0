import { Card, CardContent, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FunctionComponent } from "react";

interface AboutUserProps {
  address: "string";
  createdAt: Date;
  websiteUrl: string;
  aboutMe: string;
}

export const AboutUser: FunctionComponent<AboutUserProps> = (props) => {
  const { address, createdAt, websiteUrl, aboutMe } = props;
  return (
    <Card sx={{ marginBottom: "1rem", width: "100%" }}>
      <CardContent>
        <Stack>
          <Typography variant="h6" fontWeight="600">
            About You
          </Typography>
          <Typography variant="body1">
            <span style={{ fontWeight: "600" }}>Address: </span>
            {address}
          </Typography>
          <Typography variant="body1">
            <span style={{ fontWeight: "600" }}>Member since: </span>
            {createdAt}
          </Typography>
          <Typography variant="body1">
            <span style={{ fontWeight: "600" }}>Website: </span>
            {websiteUrl}
          </Typography>
          <Typography variant="body1">
            <span style={{ fontWeight: "600" }}>About Me: </span>
            {aboutMe}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
