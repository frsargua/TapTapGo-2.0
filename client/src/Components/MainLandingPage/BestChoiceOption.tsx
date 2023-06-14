import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";
import image from "./Salsatemple.jpg";

interface BestChoiceOptionProps {}

const BestChoiceOption: FunctionComponent<BestChoiceOptionProps> = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "50vh",
        maxHeight: "500px",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "40%",
          backgroundImage:
            "linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))",
          zIndex: 1,
        }}
      />
      <CardContent
        sx={{
          position: "absolute",
          zIndex: 2,
          bottom: "2%",
          color: "white",
          textAlign: "center",
          p: "30px",
          textAlignLast: "left",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Check into the world's best socials!
        </Typography>
        <Typography variant="h6" mb={2} fontWeight={300}>
          See our top 1%, powered by real reviews
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            borderRadius: "50px",
            bgcolor: "white",
            color: "black",
            mt: 2,
            px: 4,
            py: 1.5,
            "&:hover": {
              bgcolor: "lightgrey",
            },
          }}
        >
          See the list
        </Button>
      </CardContent>
    </Box>
  );
};

export default BestChoiceOption;
