import { useContext, ChangeEvent, useState, ReactNode, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { ModalContext } from "../../../contexts/ModalContext";
import { RenderMobileMenu } from "./RenderMobileMenu";
import { RenderLogo } from "./RenderLogo";
import { NotLoggedBar } from "./NotLoggedBar";
import { LoggedBar } from "./LoggedBar";
import { AvatarMenu } from "./AvatarMenu";
import Auth from "../../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_USER_AVATAR } from "../../../graphQL/Queries";

interface NavbarProps {}

export const Navbar: FunctionComponent<NavbarProps> = () => {
  const { openSignModal, openBookmarkModal } = useContext(ModalContext);
  const [anchorElementForNav, setAnchorElNav] = useState<Element | null>(null);
  const [anchorElementForUserMenu, setAnchorElUser] = useState<Element | null>(
    null
  );
  const [logged, setLogged] = useState(Auth.loggedIn());
  const [avatarImg, setAvatarImg] = useState("");

  let tokenUserId = "";
  if (logged) {
    tokenUserId = Auth.getProfile()?.data.id;
  }

  const { data } = useQuery(QUERY_USER_AVATAR, {
    variables: { userId: tokenUserId },
    skip: !Auth.loggedIn(),
  });

  useEffect(() => {
    if (data?.QueryUserByID?.profileAvatar) {
      setAvatarImg(data.QueryUserByID.profileAvatar);
    }
  }, [data]);

  const pagesNotLogged = [
    { title: "How it works?", directory: "How-it-works" },
    { title: "Add event", directory: "new-event" },
  ];
  const pagesLogged = [
    { title: "How it works?", directory: "How-it-works" },
    { title: "Create Event", directory: "createEvent" },
  ];

  const openNavMenu = (event: ChangeEvent<any>) => {
    setAnchorElNav(event.currentTarget);
  };
  const openDropDownUserMenu = (event: ChangeEvent<any>) => {
    setAnchorElUser(event.currentTarget);
  };

  const closeNavMenu = () => {
    setAnchorElNav(null);
  };

  const closeDropDownUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters sx={{ mb: "0.5rem" }}>
        {/* For mobile */}
        <RenderMobileMenu
          openNavMenu={openNavMenu}
          closeNavMenu={closeNavMenu}
          anchorElementForNav={anchorElementForNav}
          pages={logged ? pagesLogged : pagesNotLogged}
          logged={logged}
        />
        {/* For Desktop */}
        <RenderLogo />
        <Toolbar>
          {logged && (
            <>
              <LoggedBar
                closeNavMenu={closeNavMenu}
                openBookmarkModal={openBookmarkModal}
                pages={logged ? pagesLogged : pagesNotLogged}
              />
              <AvatarMenu
                closeDropDownUserMenu={closeDropDownUserMenu}
                openDropDownUserMenu={openDropDownUserMenu}
                anchorElementForUserMenu={anchorElementForUserMenu}
                avatar={avatarImg}
              />
            </>
          )}
          {!logged && (
            <NotLoggedBar
              closeNavMenu={closeNavMenu}
              openSignModal={openSignModal}
            />
          )}
        </Toolbar>
      </Toolbar>
    </Container>
  );
};
