import Select from "@mui/material/Select";
import {
  Box,
  Button,
  ButtonBase,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Slider,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, {
  FunctionComponent,
  useRef,
  useState,
  MouseEvent,
  ReactNode,
  MutableRefObject,
  Ref,
} from "react";
import { SingleEventCard } from "../../Components/Common/EventCard";
import { MapPage } from "./MapPage";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { dataList } from "../../Constants/Index";
import SliderProton from "../../Components/Common/SlideProton";

interface MapProps {}

export const Map: FunctionComponent<MapProps> = () => {
  let [selected, setSelected] = useState<string>("");
  const inputEl = useRef<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid
        container
        columnSpacing={2}
        sx={{ width: "100vw", height: "calc(100vh - 150px)" }}
      >
        <Paper
          elevation={1}
          sx={{
            pb: 3,
            borderRadius: 2,
            backgroundColor: "background.paper",
            m: "auto",
          }}
        >
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: (theme) => theme.spacing(2),
            }}
          >
            <Box sx={{ width: "220px" }}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Enter here"
                InputProps={{
                  style: { height: "40px" },
                }}
              />
            </Box>
            <Box sx={{ width: "220px" }}>
              <Select
                variant="outlined"
                labelId="distanceGroup"
                value={3}
                name="distanceGroup"
                fullWidth
                size="small"
                InputProps={{
                  style: { height: "40px" },
                }}
              >
                <MenuItem value={0.5}>0.5km</MenuItem>
                <MenuItem value={1}>1km</MenuItem>
                <MenuItem value={3}>3km</MenuItem>
                <MenuItem value={5}>5km</MenuItem>
                <MenuItem value={10}>10km</MenuItem>
              </Select>
            </Box>
            <Box sx={{ width: "220px" }}>
              <Button
                fullWidth
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                variant="outlined"
                sx={{ height: "40px" }}
              >
                <MonetizationOnIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Box
                  sx={{
                    width: "250px",
                    mx: (theme) => theme.spacing(3),
                    mt: (theme) => theme.spacing(3),
                  }}
                >
                  <SliderProton value={15} />
                </Box>
              </Menu>
            </Box>
            <Box sx={{ width: "220px" }}>
              <Select
                fullWidth
                variant="outlined"
                labelId="categoryGroup"
                value={"Bachata"}
                name="categoryGroup"
                size="small"
                InputProps={{
                  style: { height: "40px" },
                }}
              >
                <MenuItem value={"Bachata"}>Bachata</MenuItem>
                <MenuItem value={"Kizomba"}>Kizomba</MenuItem>
                <MenuItem value={"Salsa"}>Salsa</MenuItem>
              </Select>
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "150px", height: "40px" }}
            >
              Search
            </Button>
          </Grid>
        </Paper>

        <Grid item xs={12} md={8} lg={12}>
          <Box sx={{ position: "relative" }}>
            <MapPage
              setSelected={setSelected}
              inputEl={inputEl}
              dataList={dataList}
            />
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                width: "70%",
                height: "80px",
                bottom: "1%",
                display: { xs: "block", md: "none" },
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Typography variant="h2" textAlign="center">
                Filters
              </Typography>
            </Button>
          </Box>
        </Grid>
        {/* <Grid
          item
          xs={12}
          md={4}
          lg={3}
          sx={{
            overflowY: "scroll",
            overflowX: "hidden",
            display: { xs: "none", md: "block" },
            width: "100%",
            height: "100%",
          }}
        >
          {dataList.map((el, i) => {
            const itemProps =
              selected == el._id
                ? {
                    ref: inputEl,
                    tabIndex: 0,
                    boxShadow: 10,
                  }
                : {};

            console.log(el);
            return (
              <>
                <Box
                  component="div"
                  {...itemProps}
                  sx={{
                    width: "99%",
                  }}
                  margin="10px"
                >
                  <SingleEventCard {...el} />
                </Box>
              </>
            );
          })}
        </Grid> */}
        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          sx={{
            overflowY: "hidden",
            overflowX: { xs: "scroll", md: "hidden" },
            display: { xs: "inline-flex", md: "none" },
            width: "100%",
            height: "auto",
            my: "1rem",
          }}
        >
          {dataList.map((el, i) => {
            const itemProps =
              selected == el._id
                ? {
                    ref: inputEl,
                    tabIndex: 0,
                    boxShadow: 10,
                  }
                : {};

            return (
              <>
                <Box
                  component="div"
                  {...itemProps}
                  sx={{
                    width: "99%",
                    margin: "20px",
                  }}
                >
                  {/* <SingleEventCard {...el} /> */}
                </Box>
              </>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};
