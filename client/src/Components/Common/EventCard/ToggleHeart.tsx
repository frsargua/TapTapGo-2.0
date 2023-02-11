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
      sx={{
        position: "absolute",
        bottom: 0,
        right: 0,
        color: "red",
      }}
      onClick={toggleHeart}
    />
  ) : (
    <FavoriteBorderIcon
      sx={{
        position: "absolute",
        bottom: 0,
        right: 0,
        color: "red",
      }}
      onClick={toggleHeart}
    />
  );
};
