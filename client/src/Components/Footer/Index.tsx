import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgb(209, 65, 12)",
        color: "#FEF7E3",
        borderTop: "5px solid #f8f7fa",
        py: "2rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Dance Events
            </Typography>
            <Typography>
              We are passionate about bringing joy to people through dance.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Newsletter
            </Typography>
            <Typography>Subscribe to get our updates</Typography>
            <form noValidate autoComplete="off">
              <TextField
                sx={{ backgroundColor: "white", borderRadius: "10px" }}
                label="Your email"
                variant="filled"
                fullWidth
              />
              <Button variant="contained" color="primary">
                Subscribe
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography>
              123 Dance Street, NY
              <br />
              Email: dance@events.com
              <br />
              Phone: +1 123 456 7890
            </Typography>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={3}>
          <Typography variant="body1">
            © {new Date().getFullYear()} Dance Events. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
