import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField } from "@mui/material";
import { FunctionComponent } from "react";
import { ChangeEvent } from "react";
interface SearchBarProps {
  value: string;
  changeInput: (e: ChangeEvent<any>) => void;
}
export const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
  let { value, changeInput } = props;

  return (
    <Box sx={{ display: "flex", alignItems: "center", padding: "1.5rem 1rem" }}>
      <SearchIcon className="searchBar-icon" sx={{ m: "1rem" }} />
      <TextField
        type="text"
        variant="standard"
        fullWidth
        placeholder="Salsa with ... "
        value={value}
        onChange={changeInput}
      />
    </Box>
  );
};
