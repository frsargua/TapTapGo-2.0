import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Toolbar,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";
import image from "./GroupCardImage.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface GroupOfEventsCardProps {}

const GroupOfEventsCard: FunctionComponent<GroupOfEventsCardProps> = () => {
  return (
    <>
      <Card elevation={0} sx={{ backgroundColor: "#fff", width: "100%" }}>
        <CardMedia sx={{ height: 185 }} image={image} title="green iguana" />
        <CardContent>
          <Typography
            variant="body1"
            fontWeight={600}
            component="h5"
            gutterBottom
          >
            Best SBK events in london!{" "}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CheckCircleIcon
              sx={{ color: "green", fontSize: "2rem", mr: "1rem" }}
            />
            <Typography variant="body2" component="p">
              TapTapGo
            </Typography>
          </Box>
          <Typography
            variant="body2"
            fontWeight={600}
            component="p"
            color={"rgb(209, 65, 12)"}
          >
            Upcoming events
          </Typography>
          <CardContent>
            <Typography
              variant="body1"
              component="p"
              color={"rgb(111, 114, 135)"}
            >
              Discover the electrifying salsa and bachata scene in London!
              Experience the vibrant rhythms, passionate moves, and
              unforgettable nights out. From social events to exciting
              workshops, our events cater to all levels. Embrace the sizzling
              atmosphere, connect with a diverse community, and unleash your
              inner Latin spirit. Don't miss out – grab your dancing shoes and
              join us now!
            </Typography>
          </CardContent>
        </CardContent>
      </Card>
    </>
  );
};

export default GroupOfEventsCard;
