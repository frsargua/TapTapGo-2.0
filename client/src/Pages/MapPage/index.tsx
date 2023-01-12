import Select from "@mui/material/Select";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Slider,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { FunctionComponent, useRef, useState, MouseEvent } from "react";
import { SingleEventCard } from "../../Components/EventCard";
import { MapPage } from "./MapPage";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { dataList } from "../../Constants/Index";
import SliderProton from "../../Components/Common/SlideProton";

interface MapProps {}

export const Map: FunctionComponent<MapProps> = () => {
  let [selected, setSelected] = useState<string>("");
  const inputEl = useRef(null);

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
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          sx={{ mb: "1rem", display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              display: "inline-flex",
            }}
          >
            <Box width="220px">
              <TextField fullWidth />
            </Box>
            <Box width="220px">
              <Select
                labelId="ageGroup"
                value={3}
                label="Distance"
                variant="outlined"
                fullWidth
                name="ageGroup"
                // onChange={(value) => ChangeNewEvent(value)}
              >
                <MenuItem value={0.5}>0.5km</MenuItem>
                <MenuItem value={1}>1km</MenuItem>
                <MenuItem value={3}>3km</MenuItem>
                <MenuItem value={5}>5km</MenuItem>
                <MenuItem value={10}>10km</MenuItem>
              </Select>
            </Box>
            <Box width="220px">
              <Button
                fullWidth
                sx={{ height: "100%" }}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                variant="outlined"
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
                <Box sx={{ width: "250px", mx: "2rem", mt: "2rem" }}>
                  <SliderProton value={15} />
                </Box>
              </Menu>
            </Box>
            <Box width="220px">
              <Select
                fullWidth
                labelId="ageGroup"
                value={"Bachata"}
                label="Category"
                name="ageGroup"
                // onChange={(value) => ChangeNewEvent(value)}
              >
                <MenuItem value={"Bachata"}>Bachata</MenuItem>
                <MenuItem value={"Kizomba"}>Kizomba</MenuItem>
                <MenuItem value={"Salsa"}>Salsa</MenuItem>
              </Select>
            </Box>
            <Button color="warning" sx={{ width: "150px" }}>
              Search
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <MapPage setSelected={setSelected} inputEl={inputEl} />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          sx={{
            overflowY: "scroll",
            overflowX: "hidden",
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
        </Grid>
      </Grid>
    </>
  );
};
