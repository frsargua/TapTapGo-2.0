import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FunctionComponent, useEffect } from "react";

interface RenderBookmarkIconProps {
  isBookmarked: Boolean;
  toggleHeart: () => void;
}

export const RenderBookmarkIcon: FunctionComponent<RenderBookmarkIconProps> = (
  props
) => {
  let { isBookmarked, toggleHeart } = props;

  return isBookmarked ? (
    <FavoriteIcon
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        padding: "1rem",
        backgroundColor: "black",
        color: "red",
      }}
      onClick={toggleHeart}
    />
  ) : (
    <FavoriteBorderIcon
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        padding: "1rem",
        backgroundColor: "black",
        color: "white",
      }}
      onClick={toggleHeart}
    />
  );
};
