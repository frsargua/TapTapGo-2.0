import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { AvatarMenu } from "./AvatarMenu";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import React, { ChangeEvent, FunctionComponent } from "react";

interface LoggedBarProps {
  closeNavMenu: () => void;
  openBookmarkModal: () => void;
  pages: { title: string; directory: string }[];
}

export const LoggedBar: FunctionComponent<LoggedBarProps> = (props) => {
  let { closeNavMenu, pages, openBookmarkModal } = props;

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          marginRight: "1rem",
        }}
      >
        {pages.map((page) => (
          <Button
            onClick={closeNavMenu}
            key={page.title}
            sx={{
              my: 2,
              color: "inherit",
              display: "block",
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/${page.directory}`}
            >
              {page.title}
            </Link>
          </Button>
        ))}

        <Button
          onClick={openBookmarkModal}
          sx={{ my: 2, color: "inherit", display: "block" }}
        >
          Bookmark
        </Button>
      </Box>
    </>
  );
};
