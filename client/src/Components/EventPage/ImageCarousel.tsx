import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FunctionComponent } from "react";

interface ImageCarouselProps {
  images: { imageLink: string; __typename: string }[];
}
export const ImageCarousel: FunctionComponent<ImageCarouselProps> = (props) => {
  let { images } = props;
  return (
    <div style={{ height: "300px" }}>
      <Carousel className="carousel" dynamicHeight={false} showThumbs={false}>
        {images.map((el, index) => {
          return (
            <div key={index}>
              <img
                style={{ objectFit: "contain", height: "300px" }}
                src={el.imageLink}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
