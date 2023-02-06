export const averageRatingFromDB = (reviews: { rating: number }[]): number => {
  return (
    reviews
      .map((review) => review.rating)
      .reduce((acc, curr) => acc + curr, 0) / reviews.length
  );
};

export function selectRandomImage(arrImages: { imageLink: string }[]): string {
  console.log(arrImages);
  return arrImages[Math.floor(Math.random() * arrImages.length)].imageLink;
}
