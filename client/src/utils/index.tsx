import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
export const averageRatingFromDB = (reviews: { rating: number }[]): number => {
  return (
    reviews
      .map((review) => review.rating)
      .reduce((acc, curr) => acc + curr, 0) / reviews.length
  );
};

export function selectRandomImage(arrImages: { imageLink: string }[]): string {
  return arrImages[Math.floor(Math.random() * arrImages.length)].imageLink;
}

export const uploadImage = async (image) => {
  if (image == null) return;
  const imageRef = ref(storage, `events/images/${image.name + v4()}`);
  let snapshot = await uploadBytes(imageRef, image);
  let URL = await getDownloadURL(snapshot.ref);
  console.log(URL);
  return await URL;
};
