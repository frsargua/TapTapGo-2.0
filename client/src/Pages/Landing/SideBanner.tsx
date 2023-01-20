import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { itemData } from "../../_mock/Cities/index.js";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const SideBanner: React.FunctionComponent = () => {
  return (
    <ImageList
      sx={{
        width: "100%",
        height: "auto",
        display: { xs: "none", md: "grid" },
      }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData().map((item, i) => (
        <ImageListItem
          key={i}
          sx={{ overflow: "hidden" }}
          cols={item.cols}
          rows={item.rows}
        >
          <Link to={`/search/${item.title}`}>
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
          </Link>
          <Typography
            variant="body1"
            sx={{
              position: "absolute",
              fontWeight: 600,
              top: 0,
              margin: "0.2rem",
              zIndex: "99",
              color: "white",
            }}
          >
            {item.title}
          </Typography>
        </ImageListItem>
      ))}
    </ImageList>
  );
};
