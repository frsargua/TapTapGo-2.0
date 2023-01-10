import { Grid } from "@mui/material";
import { useState } from "react";
import { Banner } from "../../Components/Profile/Banner";
import { AboutUser } from "../../Components/Profile/AboutUser";
import { ReviewForm } from "../../Components/Common/ReviewForm/index";
import { ReviewCard } from "../../Components/Common/ReviewCard/index";
import { SingleEventCard } from "../../Components/EventCard/index";
import { FunctionComponent } from "react";
import { Box, Container } from "@mui/system";

interface ProfileDashBoardProps {}

export const ProfileDashBoard: FunctionComponent<
  ProfileDashBoardProps
> = () => {
  let options = ["Bookmarks", "Your Events", "Your Reviews", "Going"];

  let userDetails = { bookmarks: [], myEvents: [], reviews: [], events: [] };

  const [postBoardOption, setPostBoard] = useState("Activities");

  function changeBoardOptions(value) {
    setPostBoard(value);
  }

  function renderPostBoard() {
    if (postBoardOption === "Bookmarks") {
      return (
        <Grid container spacing={2}>
          {userDetails.bookmarks.map((review, i) => {
            return (
              <Grid key={i} item xs={11} sm={10} md={4} lg={3}>
                <SingleEventCard {...review} key={i} />
              </Grid>
            );
          })}
        </Grid>
      );
    } else if (postBoardOption === "Your Events") {
      return (
        <Grid container spacing={2}>
          {userDetails.myEvents.map((myEvent, i) => {
            return (
              <Grid key={i} item xs={11} sm={10} md={4} lg={3}>
                <SingleEventCard {...myEvent} key={i} />
              </Grid>
            );
          })}
        </Grid>
      );
    } else if (postBoardOption === "Your Reviews") {
      return userDetails.reviews.map((review, i) => (
        <ReviewCard {...review} key={i} />
      ));
    } else if (postBoardOption === "NewEvent") {
      return <ReviewForm />;
    } else if (postBoardOption === "Going") {
      return (
        <Grid container spacing={2}>
          {userDetails.events.map((myEvent, i) => {
            return (
              <Grid key={i} item xs={11} sm={10} md={4} lg={3}>
                <SingleEventCard {...myEvent} key={i} />
              </Grid>
            );
          })}
        </Grid>
      );
    } else {
      return <h1>Hello</h1>;
    }
  }
  return (
    <>
      <Box
        sx={{
          backgroundColor: "black",
          height: "300px",
          width: "100%",
        }}
      >
        <img
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          src="https://images.unsplash.com/photo-1488747279002-c8523379faaa?w=242&h=242&fit=crop&auto=format&dpr=2"
        />
      </Box>
      <Container maxWidth="xl" sx={{ position: "relative", top: "-50px" }}>
        <div className="section__block-Y-5">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Banner
                userInfo={userDetails}
                bannerOptions={options}
                changePostBoard={changeBoardOptions}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <AboutUser userInfo={userDetails.userInfo} />
              <AboutUser userInfo={userDetails.userInfo} />
            </Grid>
            <Grid item xs={12} md={9}>
              {renderPostBoard()}
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};
