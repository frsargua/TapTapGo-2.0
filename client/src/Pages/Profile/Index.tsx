import { Banner } from "../../Components/Profile/Banner";
import { AboutUser } from "../../Components/Profile/AboutUser";
import { ReviewCard } from "../../Components/Common/ReviewCard/index";
import { SingleEventCard } from "../../Components/Common/EventCard/index";
import { options } from "../../Constants/Index";
import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { ReactNode, useState, FunctionComponent, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROFILEDATA } from "../../graphQL/Queries";
import Auth from "../../utils/auth";

interface ProfileDashBoardProps {}

export const ProfileDashBoard: FunctionComponent<
  ProfileDashBoardProps
> = () => {
  // let userDetails = { bookmarks: [], myEvents: [], reviews: [], events: [] };
  const userParam = Auth.getProfile().data.id;
  const [userDetails, SetUserDetails] = useState<any>({});

  const { loading, data } = useQuery(GET_PROFILEDATA, {
    variables: { userId: userParam },
  });

  const [postBoardOption, setPostBoard] = useState<string>("");

  function changeBoardOptions(value: string) {
    setPostBoard(value);
  }

  useEffect(() => {
    if (data?.QueryUserByID) {
      console.log(data.QueryUserByID);
      SetUserDetails(data.QueryUserByID);
    }
  }, [data]);

  function renderBoardOption(): ReactNode {
    switch (postBoardOption) {
      case "bookmarks":
        return (
          <Grid container spacing={2}>
            {userDetails.bookmarked.map((review, i) => {
              return (
                <Grid key={i} item xs={11} sm={10} md={4} lg={3}>
                  <SingleEventCard {...review} key={i} />
                </Grid>
              );
            })}
          </Grid>
        );

      case "yourEvents":
        return (
          <Grid container spacing={2}>
            {userDetails.parties.map((myEvent, i) => {
              return (
                <Grid key={i} item xs={11} sm={10} md={4} lg={3}>
                  <SingleEventCard {...myEvent} key={i} />
                </Grid>
              );
            })}
          </Grid>
        );

      case "going":
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
      case "admin":
        return (
          <Grid container spacing={2}>
            {userDetails.events.map((myEvent, i) => {
              return (
                <Grid key={i} item xs={11} sm={10} md={4} lg={3}>
                  <SingleEventCard {...myEvent} key={i} />
                  <h1>Hello</h1>
                </Grid>
              );
            })}
          </Grid>
        );
      case "yourReviews":
        return userDetails.reviews.map((review, i) => (
          <ReviewCard {...review} key={i} />
        ));
      default:
        return (
          <Grid container spacing={2}>
            <h1>Good to see you back</h1>
          </Grid>
        );
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
              <AboutUser userInfo={userDetails} />
              <AboutUser userInfo={userDetails} />
            </Grid>
            <Grid item xs={12} md={9}>
              {renderBoardOption()}
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};
