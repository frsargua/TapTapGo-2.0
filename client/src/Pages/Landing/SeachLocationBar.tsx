import * as React from "react";
import TextField from "@mui/material/TextField";
import { usePlacesWidget } from "react-google-autocomplete";

interface SearchLocationProps {
  updateLocation: (city: string) => void;
}

export const SearchLocation: React.FunctionComponent<SearchLocationProps> = (
  props
) => {
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
    <TextField
      fullWidth
      color="primary"
      variant="outlined"
      inputRef={CityResult}
    />
  );
};
