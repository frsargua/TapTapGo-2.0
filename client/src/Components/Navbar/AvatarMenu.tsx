import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { FunctionComponent } from "react";

interface AvatarMenuProps {
  handleOpenUserMenu: (event: ChangeEvent<any>) => void;
  handleCloseUserMenu: () => void;
  anchorElUser: string | null;
  avatar: string;
}

export const AvatarMenu: FunctionComponent<AvatarMenuProps> = (props) => {
  let { handleOpenUserMenu, handleCloseUserMenu, anchorElUser, avatar } = props;
  return (
    <Box>
      <Tooltip title="avatar">
        <IconButton onClick={handleOpenUserMenu} sx={{ padding: "0" }}>
          <Avatar alt="avatar" src={avatar} sx={{ width: 50, height: 50 }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorElUser || anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem>
          <Link to={`/user/${1}`}>Dashboard</Link>
        </MenuItem>
        <MenuItem>
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
