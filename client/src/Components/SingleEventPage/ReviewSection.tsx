import { Typography } from "@mui/material";
import { ReviewCard } from "../Common/Cards/ReviewCard";
import { ReviewForm } from "../Common/ReviewForm";
import Box from "@mui/material/Box";
import { FunctionComponent } from "react";
import Auth from "../../utils/auth";

interface ReviewSectionProps {
  eventId: string;
  reviewsArray: {
    _id: string;
    postedBy: string;
    username: string;
    title: string;
    reviewText: string;
    rating: number;
    __typename: string;
  }[];
}

export const ReviewSection: FunctionComponent<ReviewSectionProps> = ({
  eventId,
  reviewsArray,
}) => {
  let logged = Auth.loggedIn();

  return (
    <Box mt="4rem" width="90%">
      {logged ? (
        <>
          <Typography variant="h4" fontWeight="600" textAlign="center">
            Leave your review:
          </Typography>
          <ReviewForm eventIdParam={eventId} />
        </>
      ) : (
        <Typography
          variant="h4"
          fontWeight="600"
          textAlign="center"
          gutterBottom
        >
          Sign In to Write a review
        </Typography>
      )}

      <Typography variant="h4" fontWeight="600" textAlign="center" gutterBottom>
        What others thought:
      </Typography>
      <Box>
        {reviewsArray.map((el, index) => {
          return (
            <ReviewCard
              key={index}
              title={el.title}
              rating={el.rating}
              username={el.username}
              reviewText={el.reviewText}
              postedBy={el.postedBy}
              _id={el._id}
            />
          );
        })}
      </Box>
    </Box>
  );
};
