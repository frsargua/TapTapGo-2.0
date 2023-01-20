import { Slider } from "@mui/material";
import { ChangeEvent } from "react";
import { FunctionComponent } from "react";

interface SliderProtonProps {
  value: number[];
  changePrice: (e: Event, newValue: number | number[]) => void;
}

const SliderProton: FunctionComponent<SliderProtonProps> = ({
  value,
  changePrice,
}) => {
  return (
    <div>
      <Slider
        value={value}
        onChange={(event, number) => changePrice(event, number)}
        valueLabelDisplay="on"
        min={0}
        max={100}
        sx={{
          color: "#000",
        }}
      />
    </div>
  );
};

export default SliderProton;
