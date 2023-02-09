import { Checkbox, FormControlLabel } from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import { FunctionComponent } from "react";

interface CheckboxProtonProps {
  changeChecked: (id: number) => void;
  category: { id: number; checked: boolean; label: string };
}

const CheckboxProton: FunctionComponent<CheckboxProtonProps> = (props) => {
  let { changeChecked, category } = props;
  let { checked, label, id } = category;

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
            onChange={() => {
              changeChecked(+id);
            }}
            inputProps={{ "aria-label": "checkbox with small size" }}
          />
        }
        label={label}
      />
    </div>
  );
};

export default CheckboxProton;
