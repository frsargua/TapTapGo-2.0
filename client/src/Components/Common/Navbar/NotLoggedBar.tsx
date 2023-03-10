import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import Stack from "@mui/material/Stack";

import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { FunctionComponent } from "react";

interface NotLoggedBarProps {
  closeNavMenu: () => void;
  openSignModal: () => void;
}

export const NotLoggedBar: FunctionComponent<NotLoggedBarProps> = (props) => {
  let { closeNavMenu, openSignModal } = props;
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          marginRight: "1rem",
        }}
      >
        <Button
          onClick={closeNavMenu}
          sx={{
            my: 2,
            color: "inherit",
            display: "block",
            textDecoration: "none",
          }}
        >
          <Link to={`/How-it-works`}> How it works</Link>
        </Button>
      </Box>
      <Button onClick={openSignModal} startIcon={<LoginIcon />}>
        Sign In
      </Button>
    </>
  );
};
