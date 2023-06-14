import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import logo from "./Logo.png";

export function RenderLogo() {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      <img src={logo} alt="" style={{ height: "50px", marginTop: "1rem" }} />
      {/* <Typography
        // noWrap
        component="image"
        src={logo}
        href="/"
        // sx={{
        //   mr: 2,
        //   display: { xs: "none", md: "flex" },
        //   fontFamily: "monospace",
        //   fontWeight: 700,
        //   letterSpacing: ".3rem",
        //   color: "inherit",
        //   textDecoration: "none",
        // }}
      /> */}
    </Box>
  );
}
