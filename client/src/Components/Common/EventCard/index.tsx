import FavoriteIcon from "@mui/icons-material/Favorite";
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
import { selectRandomImage } from "../../../utils";
import { BOOKMARK_EVENT, UNBOOKMARK_EVENT } from "../../../graphQL/Mutations";
import { ISBOOKMARK_EVENT } from "../../../graphQL/Queries";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../../utils/auth";
import { FunctionComponent } from "react";

interface SingleEventCardProps {
  eventName: string;
  price: number;
  rating: number;
  review: { rating: number }[];
  image_urls: { imageLink: string }[];
  id: string;
  createdById: string;
}

export const SingleEventCard: FunctionComponent<SingleEventCardProps> = (
  props
) => {
  let { eventName, price, rating, review, image_urls, id } = props;

  const [isBookmarked, setIsBookmarked] = useState(false);
  let { tokenUserId, isOwner } = Auth.isOwner(props);

  const { data } = useQuery(ISBOOKMARK_EVENT, {
    variables: { input: { eventId: id } },
  });
  const [bookmarkEvent] = useMutation(BOOKMARK_EVENT, {});
  const [unBookmarkEvent] = useMutation(UNBOOKMARK_EVENT, {});

  const toggleHeart = async () => {
    try {
      if (!isBookmarked) {
        await bookmarkEvent({
          variables: { input: { eventId: id } },
        });
      } else {
        await unBookmarkEvent({
          variables: { input: { eventId: id } },
        });
      }
      setIsBookmarked((prev) => !prev);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (data) {
      setIsBookmarked(data.isBookmarked.bookmarked);
    }
  }, [data]);

  return (
    <>
      <Card sx={{ maxWidth: "100%", minWidth: "250px" }}>
        <CardActionArea>
          <Link to={`/event/${id}`}>
            <CardMedia
              component="img"
              height="170"
              image={selectRandomImage(image_urls)}
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
              }}
            >
              <Rating
                size="small"
                name="read-only"
                value={rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="caption">{review.length}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                position: "relative",
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

              {!isOwner || (
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
