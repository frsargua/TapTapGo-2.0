import React, { FunctionComponent } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import SearchByTagBar from "../../Components/MainLandingPage/SearchByTagBar";
import { itemData } from "../../_mock/Cities/index.js";

import SearchLocation from "../../Components/MainLandingPage/SeachLocationBar";
import SideBanner from "../../Components/MainLandingPage/SideBanner";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import SearchBar from "../../Components/MainLandingPage/NewSearchBar";
import CategoriesBox from "../../Components/MainLandingPage/CategoriesChip";
import HomeIcon from "@mui/icons-material/Home";
import GroupOfEventsCard from "../../Components/MainLandingPage/GroupOfEventsCard";
import CityCard from "../../Components/MainLandingPage/CityCard";
import BestChoiceOption from "../../Components/MainLandingPage/BestChoiceOption";
import BestChoiceAward from "../../Components/MainLandingPage/BestChoiceAward";
import { SingleEventCard } from "../../Components/Common/Cards/EventCard";
interface LandingProps {}

const MainLandingPage: FunctionComponent<LandingProps> = () => {
  const [tags, setTags] = React.useState<{ title: string }[]>([
    { title: "salsa" },
    { title: "Bachata" },
  ]);

  const [searchTag, setSearchTag] = React.useState<string>("");
  const [city, setCity] = React.useState<string>("");
  const [urlSearch, setUrlSearch] = React.useState("");

  function handleTagChange(value: string) {
    setSearchTag(value);
  }

  function handleAddress(city: string) {
    setCity(city);
  }

  React.useEffect(() => {
    if (searchTag === "") {
      setUrlSearch(`/search-by-city/${city}`);
      return;
    } else {
      setUrlSearch(`/search/${city}/${searchTag}`);
    }
  }, [city, searchTag]);

  return (
    <>
      <SearchBar updateLocation={handleAddress} />
      <Container maxWidth="xl" sx={{ mt: "3rem" }}>
        <section style={{ marginTop: "2rem", marginBottom: "4rem" }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Check out trending categories
          </Typography>
          <Grid container spacing={1} mb="1.5rem">
            {[...Array(8)].map((_, index) => (
              <Grid item xs={3} key={index}>
                <CategoriesBox
                  label="Category"
                  onClick={() => console.log(`Category ${index + 1} clicked`)}
                  IconComponent={HomeIcon}
                />
              </Grid>
            ))}
          </Grid>
        </section>
        <section style={{ marginTop: "6rem", marginBottom: "4rem" }}>
          <BestChoiceOption />
        </section>
        <section style={{ marginTop: "6rem", marginBottom: "4rem" }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Popular Events in the <span style={{ color: "#3659e3" }}>UK</span>
          </Typography>

          <Box>
            <Grid container spacing={2} columnGap={3}>
              {[...Array(8)].map((_, index) => (
                <Grid item xs={2} key={index}>
                  <SingleEventCard
                    eventName={"salsa"}
                    price={10}
                    rating={4.5}
                    review={[]}
                    image_urls={[
                      {
                        imageLink:
                          "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
                      },
                    ]}
                    createdById={"1"}
                    id={"1"}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </section>

        <section style={{ marginTop: "6rem", marginBottom: "4rem" }}>
          <Box>
            <Card elevation={0} sx={{ backgroundColor: "#f8f7fa" }}>
              <CardContent sx={{ m: "1rem" }}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  component="h5"
                  gutterBottom
                >
                  Hand-picked
                </Typography>
                <Typography
                  variant="h4"
                  component="h4"
                  fontWeight={700}
                  color={"rgb(209, 65, 12)"}
                  gutterBottom
                >
                  Collections
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  color={"#4b4d63"}
                  gutterBottom
                >
                  Discover more of the best in food, music, wellness, and more
                  with our curated event collections
                </Typography>
                <Box>
                  <Grid container spacing={4}>
                    <Grid item xs={7} sm={6}>
                      <GroupOfEventsCard />
                    </Grid>
                    <Grid item xs={7} sm={6}>
                      <GroupOfEventsCard />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </section>
      </Container>

      <section style={{ marginTop: "6rem", marginBottom: "0rem" }}>
        <Box sx={{ backgroundColor: "#f8f7fa", width: "100%", py: "80px" }}>
          <Container maxWidth="xl" sx={{ mt: "3rem" }}>
            <Typography
              variant="h5"
              fontWeight={600}
              component="h5"
              // color={"#4b4d63"}
              gutterBottom
            >
              Top destinations in United Kingdom
            </Typography>
            <Box
              sx={{
                width: "100%",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: "220px", // Adjust the width of the blurred area as needed
                  background:
                    "linear-gradient(to left, #f8f7fa, rgba(255, 255, 255, 0))", // Adjust the gradient direction and colors as needed
                  zIndex: 2,
                }}
              ></div>
              <Box
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  width: "100%",
                  "& > *": {
                    flex: "0 0 auto",
                  },
                }}
              >
                {itemData().map((el) => (
                  <Link to={`/search/${el.title}`}>
                    <CityCard image={el.img} city={el.title} />
                  </Link>
                ))}
                <CityCard
                  image="https://d1n9ior3u0lhlo.cloudfront.net/united-kingdom--london.jpg"
                  city="London"
                />
              </Box>
            </Box>
          </Container>
        </Box>
      </section>
      <section style={{ marginTop: "0rem", marginBottom: "4rem" }}>
        <BestChoiceAward />
      </section>

      {/* <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        md={5}
        lg={8}
        height="80vh"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography gutterBottom variant="h1">
          Hobbies Everywhere
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <SearchLocation updateLocation={handleAddress} />
          </Grid>
          <Grid item xs={12} md={6}>
            <SearchByTagBar
              updateTag={handleTagChange}
              category={tags}
              inputLabel="Select a category"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid
              item
              xs={12}
              sx={{ display: "center", justifyContent: "center" }}
            >
              <Link
                to={searchTag !== "" || city !== "" ? `${urlSearch}` : ""}
              >
                <Button disabled size="large" variant="outlined">
                  Search
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} md={5} lg={4}>
        <SideBanner />
      </Grid>
    </Grid> */}
    </>
  );
};

export default MainLandingPage;
