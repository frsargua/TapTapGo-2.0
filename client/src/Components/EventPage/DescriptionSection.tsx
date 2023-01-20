import { Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface DescriptionSectionProps {
  eventData: { eventName: string; description: string };
}

export const DescriptionSection: FunctionComponent<DescriptionSectionProps> = (
  props
) => {
  let { eventName, description } = props.eventData;
  return (
    <>
      <Typography
        variant="h4"
        fontWeight="600"
        gutterBottom
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        {eventName}
      </Typography>
      <Typography variant="body1" style={{ margin: " 0 50px" }}>
        {description}
      </Typography>
    </>
  );
};
