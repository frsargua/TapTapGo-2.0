import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { InputLabel } from "@mui/material";
import { Update } from "@mui/icons-material";

interface SearchByTagProps {
  category: { title: string }[];
  inputLabel: string;
  updateTag: (event: string) => void;
}

export default function SearchByTagBar(props: SearchByTagProps) {
  const { category, inputLabel, updateTag } = props;
  const [open, setOpen] = React.useState(false);
  let searchSuggestionLimit = 5;

  return (
    <Autocomplete
      sx={{ width: { xs: "100%" } }}
      open={open}
      limitTags={5}
      options={category.filter((option, i) => {
        if (i < searchSuggestionLimit) {
          return option;
        }
      })}
      getOptionLabel={(option) => {
        updateTag(option.title);
        return option.title;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={inputLabel}
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
      onInputChange={(_, value) => {
        if (value.length === 0) {
          setOpen(false);
        } else {
          setOpen(true);
        }
      }}
      onClose={() => setOpen(false)}
    />
  );
}
