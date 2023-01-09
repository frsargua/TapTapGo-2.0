import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { FunctionComponent } from "react";

interface RenderMobileMenuProps {
  openNavMenu: (event: ChangeEvent<any>) => void;
  closeNavMenu: () => void;
  anchorElementForNav: Element | null;
  logged: Boolean;
  pages: { title: string; directory: string }[];
}

export const RenderMobileMenu: FunctionComponent<RenderMobileMenuProps> = ({
  openNavMenu,
  closeNavMenu,
  anchorElementForNav,
  pages,
  logged,
}) => {
  function loggedOptions() {
    return (
      <div>
        {pages.map((page) => (
          <Button
            onClick={closeNavMenu}
            key={page.title}
            sx={{ my: 2, color: "inherit", display: "block" }}
          >
            <Link to={`/${page.directory}`}>{page.title}</Link>
          </Button>
        ))}
        <Button sx={{ my: 2, color: "inherit", display: "block" }}>
          Bookmark
        </Button>
      </div>
    );
  }

  function notLoggedOptions() {
    return (
      <Button
        onClick={closeNavMenu}
        sx={{ my: 2, color: "inherit", display: "block" }}
      >
        How it works
      </Button>
    );
  }

  return (
    <>
      {/* For mobile */}
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton size="large" onClick={openNavMenu} color="inherit">
          <MenuIcon />
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorElementForNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElementForNav)}
          onClose={closeNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {logged ? loggedOptions() : notLoggedOptions()}
        </Menu>
      </Box>
      <Link style={{ textDecoration: "none", color: "black" }} to="/">
        <Typography
          variant="h5"
          noWrap
          sx={{
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
          }}
        >
          TAPTAP GO
        </Typography>
      </Link>
    </>
  );
};
