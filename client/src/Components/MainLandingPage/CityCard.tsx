import {
  Card,
  CardContent,
  CardMedia,
  Toolbar,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";

interface CityCardProps {
  image: string;
  city: string;
}

const CityCard: FunctionComponent<CityCardProps> = (props) => {
  const { image, city } = props;

  return (
    <>
      <Card
        sx={{
          position: "relative",
          borderTopLeftRadius: "3.5rem",
          borderTopRightRadius: "3.5rem",
          overflow: "hidden",
          mr: "1.5rem",
          width: "316px",
          "&:hover": {
            borderTopLeftRadius: "1.5rem",
            borderTopRightRadius: "1.5rem",
          },
          "::after": {
            content: '""',
            display: "block",
            position: "absolute",
            bottom: 0,
            height: "8px",
            width: "100%",
            backgroundColor: "#f05537",
            zIndex: 1,
            transition: "all 0.2s",
          },

          "&:hover::after": {
            height: "40px",
          },
        }}
      >
        <CardMedia sx={{ height: 208 }} image={image} />
        <Typography
          variant="h5"
          fontWeight={600}
          component="h5"
          gutterBottom
          sx={{
            color: "white",
            position: "absolute",
            bottom: "0",
            mb: "1.5rem",
            ml: "1rem",
            zIndex: 3,
          }}
        >
          {city}
        </Typography>
      </Card>
    </>
  );
};

export default CityCard;
