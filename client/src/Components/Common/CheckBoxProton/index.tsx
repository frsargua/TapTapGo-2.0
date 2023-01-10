import { Checkbox, FormControlLabel } from "@mui/material";
import { ChangeEvent } from "react";
import { FunctionComponent } from "react";

interface CheckboxProtonProps {
  changeChecked: (id: ChangeEvent<any>) => void;
  cuisine: { checked: boolean; label: string; id: string };
}

const CheckboxProton: FunctionComponent<CheckboxProtonProps> = (props) => {
  const { changeChecked, cuisine } = props;
  const { checked, label, id } = cuisine;
  return (
    <div>
      <FormControlLabel
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 0,
        }}
        control={
          <Checkbox
            size="small"
            checked={checked}
            sx={{
              color: "#000",
            }}
            onChange={() => changeChecked(id)}
            inputProps={{ "aria-label": "checkbox with small size" }}
          />
        }
        label={label}
      />
    </div>
  );
};

export default CheckboxProton;
