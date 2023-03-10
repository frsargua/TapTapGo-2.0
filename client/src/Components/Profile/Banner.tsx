import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { FunctionComponent } from "react";

const theme = createTheme();

theme.typography.h6 = {
  fontWeight: "400",

  fontSize: "1rem",
  "@media (min-width:600px)": {
    fontSize: "1.4rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
    fontWeight: "400",
  },
};

const Item = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1),
  marginRight: "1rem",
  width: "150px",
  paddingRight: theme.spacing(3),
  color: "black",
  borderRadius: "0",
  borderBottom: "1px solid black",
  textAlign: "center",
  fontWeight: 500,
  whiteSpace: "nowrap",
}));

function headerPointers(attended, upcoming, yours) {
  return (
    <>
      <Stack marginRight="2rem">
        <Typography variant="h6">Attended</Typography>
        <Typography variant="body1" textAlign="center">
          {attended}
        </Typography>
      </Stack>
      <Stack marginRight="2rem">
        <Typography variant="h6">Upcoming</Typography>
        <Typography variant="body1" textAlign="center">
          {upcoming}
        </Typography>
      </Stack>
      <Stack marginRight="2rem">
        <Typography variant="h6">Your events</Typography>
        <Typography variant="body1" textAlign="center">
          {yours}
        </Typography>
      </Stack>
    </>
  );
}

interface BannerProps {
  userInfo: any;
  bannerOptions: any;
  changePostBoard: any;
}

export const Banner: FunctionComponent<BannerProps> = (props) => {
  const { userInfo, bannerOptions, changePostBoard } = props;
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ position: "relative" }}>
        <Chip
          label="Update Details"
          onClick={handleClick}
          sx={{
            position: { md: "absolute", xs: "static" },
            right: 0,
            margin: "1rem",
          }}
        />
        <CardContent
          sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
        >
          <Avatar
            sx={{
              width: "120px",
              height: "120px",
              marginX: { xs: "auto", sm: "0" },
              marginRight: "3rem",
            }}
            alt="Remy Sharp"
            src={userInfo?.profileAvatar}
          />
          <Stack height="100" m="2rem" justifyContent="space-between">
            <Typography
              display="block"
              variant="h6"
              component="span"
              gutterBottom
              sx={{
                mx: { xs: "auto", sm: "0" },
                marginTop: { xs: "2rem", sm: "auto" },
              }}
            >
              {userInfo.firstName} {userInfo.lastName}
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {headerPointers(
                userInfo.attended,
                userInfo.upcoming,
                userInfo.yours
              )}
            </Box>
          </Stack>
        </CardContent>
        <Stack
          height="100"
          sx={{ display: { xs: "flex", md: "none", paddingLeft: "1rem" } }}
        >
          <Box sx={{ display: "flex", mx: "auto" }}>
            {headerPointers(
              userInfo.attended,
              userInfo.upcoming,
              userInfo.yours
            )}
          </Box>
        </Stack>
        <Box
          overflow={true}
          sx={{
            display: "flex",
            overflow: "auto",
            paddingLeft: "2rem",
            paddingBottom: "0.5rem",
          }}
        >
          {bannerOptions.map((el) => {
            return (
              <Item
                key={el.id}
                onClick={() => {
                  changePostBoard(el.value);
                }}
              >
                {el.label}
              </Item>
            );
          })}
        </Box>
      </Card>
    </ThemeProvider>
  );
};
