import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { AvatarMenu } from "./AvatarMenu";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import React, { ChangeEvent, FunctionComponent } from "react";

interface LoggedBarProps {
  closeMenu: () => void;
  closeUserMenu: () => void;
  anchorElNav: string | null;
  avatar: string;
  openUserMenu: (event: ChangeEvent<any>) => void;
  openBookmarkModal: () => void;
  options: { title: string; directory: string }[];
}

export const LoggedBar: FunctionComponent<LoggedBarProps> = (props) => {
  let {
    closeMenu,
    options,
    anchorElNav,
    avatar,
    closeUserMenu,
    openUserMenu,
    openBookmarkModal,
  } = props;

  return (
    <Toolbar>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          marginRight: "1rem",
        }}
      >
        {options.map((page) => (
          <Button
            onClick={closeMenu}
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
      <AvatarMenu
        handleCloseUserMenu={closeUserMenu}
        handleOpenUserMenu={openUserMenu}
        anchorElUser={anchorElNav}
        avatar={avatar}
      />
    </Toolbar>
  );
};
