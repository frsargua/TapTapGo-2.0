import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { CardActionArea } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { RenderBookmarkIcon } from "./ToggleHeart";
import { averageRatingFromDB, selectRandomImage } from "../../../utils";
import { FunctionComponent } from "react";

interface SingleEventCardProps {
  eventName: string;
  price: number;
  rating: number;
  reviews: { rating: number }[];
  images: { imageLink: string }[];
  _id: string;
  createdById: string;
}

export const SingleEventCard: FunctionComponent<SingleEventCardProps> = (
  props
) => {
  let { eventName, price, rating, reviews, images, _id, createdById } = props;
  const [isBookmarked, setIsBookmarked] = useState(false);
  //   let { tokenUserId, isOwner, logged } = Auth.isOwner();
  let isOwner = false;

  const toggleHeart = async () => {
    try {
      setIsBookmarked((prev) => !prev);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {" "}
      <Card sx={{ maxWidth: "100%", minWidth: "250px" }}>
        <CardActionArea>
          <Link to={`/event/${_id}`}>
            <CardMedia
              component="img"
              height="170"
              image={selectRandomImage(images)}
              alt={eventName}
            />
          </Link>
          <CardContent>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              textAlign="left"
            >
              {eventName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                position: "relative",
              }}
            >
              <Rating
                size="small"
                name="read-only"
                value={rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="caption">{reviews.length}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="left"
                mt={2}
                sx={{ display: "flex" }}
              >
                £ {price} /
                <PersonIcon sx={{ fontSize: "1.2rem" }} />
              </Typography>

              {isOwner || (
                <RenderBookmarkIcon
                  isBookmarked={isBookmarked}
                  toggleHeart={toggleHeart}
                />
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
