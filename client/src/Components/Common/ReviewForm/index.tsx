import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, CardContent, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useState } from "react";

export function ReviewForm({ eventIdParam }) {
  const [newReview, setReview] = useState({
    eventId: eventIdParam,
    postedBy: "",
    username: "",
    rating: 0,
    title: "",
    reviewText: "",
  });

  const updateReview = (event) => {
    let { name, value } = event.target;
    if (name === "rating") {
      value = parseInt(value);
    }
    setReview((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleCreateReview = async (event) => {
    event.preventDefault();
    console.log("inside");
    try {
      const { purchaseData } = await createReview({
        variables: { input: newReview },
      });
      console.log(purchaseData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      style={{ width: "100%" }}
      onChange={updateReview}
      onSubmit={handleCreateReview}
    >
      <Rating
        name="rating"
        onChange={updateReview}
        value={newReview.rating}
        size="large"
      />
      <Typography variant="h6" fontWeight="600">
        Add a headline
      </Typography>
      <TextField
        fullWidth
        name="title"
        placeholder="what is most important to share?"
        id="fullWidth"
        size="medium"
        margin="dense"
      />
      <Typography variant="h6" fontWeight="600">
        Write your review
      </Typography>
      <TextField
        fullWidth
        name="reviewText"
        placeholder="What id you enjoy and disliked from the event?"
        id="fullWidth"
        size="medium"
        sx={{ marginBottom: "1rem" }}
      />
      <Button type="submit" variant="outlined">
        Submit
      </Button>
    </form>
  );
}
