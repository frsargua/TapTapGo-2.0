import { usePlacesWidget } from "react-google-autocomplete";
import React from "react";
import { AppBar, Box, Toolbar, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/system";
import image from "./banner.webp";

const SearchBar: React.FC = (props) => {
  const theme = useTheme();
  const { updateLocation } = props;
  const { ref: CityResult } = usePlacesWidget({
    apiKey: "AIzaSyDcRJmo8djXEFoiqOaEa83XWA-qo2AK9qE",
    onPlaceSelected: (place) => {
      const city = place?.formatted_address?.split(",")[0];
      if (city) {
        updateLocation(city);
      }
    },
    inputAutocompleteValue: "country",
    options: {
      componentRestrictions: { country: "uk" },
    },
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage: `url(${image})`,
          height: "400px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Toolbar sx={{ position: "absolute", top: "45%", width: "100%" }}>
          <Box
            sx={{
              width: "60%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "15px",
              backgroundColor: "rgba(255, 255, 255, 0.90)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.97)" },
              height: "50px",
              color: "black",
              margin: "0 auto",
            }}
          >
            <Box
              sx={{
                // position: "absolute",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SearchIcon />
            </Box>
            <InputBase
              inputRef={CityResult}
              sx={{
                color: "black",
                textAlign: "center",
                paddingLeft: `calc(1em + ${2}px)`,
                transition: (theme) => theme.transitions.create("width"),
                width: "100%",
                [theme.breakpoints.up("sm")]: {
                  width: "20ch",
                  "&:focus": { width: "32ch" },
                },
                [theme.breakpoints.up("md")]: {
                  width: "30ch",
                  "&:focus": { width: "42ch" },
                },
                [theme.breakpoints.up("lg")]: {
                  width: "40ch",
                  "&:focus": { width: "52ch" },
                },
                [theme.breakpoints.up("xl")]: {
                  width: "50ch",
                  "&:focus": { width: "62ch" },
                },
                "& input": {
                  // Target the input element
                  textAlign: "center", // Center the text
                },
              }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchBar;
