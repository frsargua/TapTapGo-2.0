import {
  Box,
  Button,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";
import image from "./Bestchoice award-2.gif";
interface BestChoiceAwardProps {}
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const BestChoiceAward: FunctionComponent<BestChoiceAwardProps> = () => {
  return (
    <Box sx={{ backgroundColor: "#FEF7E3", width: "100%" }}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid
            item
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ m: "1rem" }}>
              <EmojiEventsIcon
                sx={{
                  color: "#fad02c",
                  fontSize: "6rem",
                  backgroundColor: "black",
                  padding: "0.5rem",
                  borderRadius: "1rem",
                }}
              />
              <Typography variant="h3" fontWeight={700}>
                Travellers'
              </Typography>
              <Typography variant="h3" fontWeight={700}>
                Choice Best Of
              </Typography>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                the Best
              </Typography>
              <Typography variant="h5" gutterBottom>
                Unleash the salsa elite - your top 1% of experiences, chosen by
                you.
              </Typography>
              <Button
                color="secondary"
                sx={{
                  borderRadius: "50px",
                  bgcolor: "black",
                  color: "white",
                  mt: 2,
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "grey",
                  },
                }}
              >
                See why!
              </Button>
            </CardContent>
          </Grid>
          <Grid
            item
            md={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={image} alt="Award" style={{ width: "55%" }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BestChoiceAward;
