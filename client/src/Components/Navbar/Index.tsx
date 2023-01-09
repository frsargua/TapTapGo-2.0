import React, { useContext, ChangeEvent, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import Stack from "@mui/material/Stack";

import { ModalContext } from "../../contexts/ModalContext";
import RenderMobileMenu from "./RenderMobileMenu";
import { RenderLogo } from "./RenderLogo";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { NotLoggedBar } from "./NotLoggedBar";
import { LoggedBar } from "./LoggedBar";
import { AvatarMenu } from "./AvatarMenu";

interface NavbarProps {}

export const Navbar: FunctionComponent<NavbarProps> = () => {
  const { openSignModal, openBookmarkModal } = useContext(ModalContext);
  const [anchorElNav, setAnchorElNav] = useState<string | null>(null);
  const [logged, setLogged] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [avatar, setAvatar] = useState("");

  const pages = logged
    ? [
        { title: "How it works?", directory: "How-it-works" },
        { title: "Add event", directory: "new-event" },
      ]
    : [{ title: "How it works?", directory: "How-it-works" }];

  const handleOpenNavMenu = (event: ChangeEvent<any>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: ChangeEvent<any>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar color="transparent" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* For mobile */}
          <RenderMobileMenu
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
            anchorElNav={anchorElNav}
            pages={pages}
            logged={logged}
          />
          {/* For Desktop */}
          <RenderLogo />
          {logged ? (
            <LoggedBar
              closeUserMenu={handleCloseUserMenu}
              openUserMenu={handleOpenUserMenu}
              anchorElNav={anchorElUser}
              avatar={avatar}
              closeMenu={handleCloseNavMenu}
              openBookmarkModal={openBookmarkModal}
              options={pages}
            />
          ) : (
            <NotLoggedBar
              closeMenu={handleCloseNavMenu}
              OpenLogin={openSignModal}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
