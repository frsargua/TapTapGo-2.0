import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import { CardActionArea } from "@mui/material";
import { FunctionComponent } from "react";

interface ReviewCardProps {
  title: string;
  rating: number;
  username: string;
  reviewText: string;
  postedBy: Date;
  _id: string;
}

export const ReviewCard: FunctionComponent<ReviewCardProps> = ({
  title,
  rating,
  username,
  reviewText,
  postedBy,
  _id,
}) => {
  let isOwner = false;

  return (
    <Card sx={{ maxWidth: "850px", mb: "1rem", marginX: "auto" }}>
      <CardActionArea>
        <CardContent sx={{ position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              textAlign="left"
              fontWeight="600"
            >
              {title}
            </Typography>
            <Rating
              size="medium"
              name="read-only"
              value={rating}
              icon={<CircleRoundedIcon fontSize="inherit" />}
              emptyIcon={<CircleRoundedIcon fontSize="inherit" />}
              readOnly
            />
          </Box>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            textAlign="left"
          >
            {username}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="left"
            mt={2}
          >
            {reviewText}
          </Typography>
          {isOwner ? (
            <DeleteOutlineIcon
              color="action"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                padding: "1rem",
                "&:active": {
                  transform: "scale(1.1)",
                },
              }}
              onClick={handleDeleteReview}
            />
          ) : (
            ""
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
