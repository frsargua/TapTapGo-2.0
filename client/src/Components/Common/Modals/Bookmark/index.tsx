import { Box, Card, CardContent } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { QUERY_USER_BOOKMARKS } from "../../../../graphQL/Queries";
import { UNBOOKMARK_EVENT } from "../../../../graphQL/Mutations";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../../../utils/auth";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../../contexts/ModalContext";
import { Link } from "react-router-dom";

const style = {
  width: "100%",
  bgcolor: "background.paper",
};

export function BookMark() {
  const { closeBookmarkModal } = useContext(ModalContext);
  const [bookmarksData, setBookmarksData] = useState([]);

  let tokenUserId;
  if (Auth.loggedIn()) {
    tokenUserId = Auth.getProfile().data.id;
  }
  const { loading, data } = useQuery(QUERY_USER_BOOKMARKS, {
    variables: { userId: tokenUserId },
    skip: !Auth.loggedIn(),
  });

  const [unBookmarkEvent] = useMutation(UNBOOKMARK_EVENT, {});

  const handleUnBookmark = async (eventId: number) => {
    try {
      await unBookmarkEvent({
        variables: { input: { eventId: eventId } },
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (data?.queryUserBookmarks) {
      console.log(data.queryUserBookmarks);
      setBookmarksData(data.queryUserBookmarks);
    }
  }, [data]);

  return (
    <Box
      onClick={closeBookmarkModal}
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 999,
        position: "fixed",
        top: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "70%", height: "500px", mx: "auto" }}>
        <CardContent sx={{ padding: "3rem" }}>
          <List sx={style} component="nav" aria-label="mailbox folders">
            {/* <Link to="/"> */}
            <ListItem button>
              <ListItemText sx={{ width: "33%" }} primary="EventName" />
              <ListItemText sx={{ width: "33%" }} primary="Cost" />
              <ListItemText sx={{ width: "33%" }} primary="location" />
            </ListItem>
            {/* </Link> */}
            <Divider />

            {bookmarksData.map((el) => {
              return (
                <ListItem sx={{ width: "100%" }} button>
                  <Link
                    style={{ display: "flex", width: "33%" }}
                    to={`/event/${el.id}`}
                  >
                    <ListItemText
                      sx={{ width: "100%" }}
                      primary={el.eventName}
                    />
                  </Link>
                  <ListItemText sx={{ width: "33%" }} primary={el.price} />
                  <ListItemText sx={{ width: "20%" }} primary={el.city} />
                  <ListItemText
                    sx={{ width: "13%" }}
                    primary="Delete"
                    onClick={() => handleUnBookmark(el.id)}
                  />
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
