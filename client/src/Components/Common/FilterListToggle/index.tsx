import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ChangeEvent } from "react";
import { FunctionComponent } from "react";

interface FilterListToggleProps {
  options: { label: string; id: string; value: string }[];
  value: number;
  selectToggle: (event: ChangeEvent<any>, value: number) => void;
}

const FilterListToggle: FunctionComponent<FilterListToggleProps> = (props) => {
  let { options, value, selectToggle } = props;
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      sx={{
        width: "100%",
        justifyContent: "space-around",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {options.map(({ label, id, value }) => (
        <ToggleButton
          key={id}
          value={value}
          onClick={selectToggle}
          sx={{
            fontSize: ".8rem",
            marginBottom: "0.5rem",
            marginRight: "0.1rem",
            borderRadius: "10px",
            "&.MuiToggleButtonGroup-groupedHorizontal:not(:last-child)": {
              borderRadius: "10px",
            },
            "&.MuiToggleButtonGroup-groupedHorizontal:not(:first-child)": {
              borderRadius: "10px",
              border: "1px solid rgba(0, 0, 0, 0.12)",
            },
            "&.Mui-selected": {
              borderRadius: "10px",
              background: "#000",
              color: "#fff",
            },
            "&.MuiToggleButton-root": {
              "&:hover": {
                background: "#000",
                color: "#fff",
              },
            },
          }}
        >
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default FilterListToggle;
