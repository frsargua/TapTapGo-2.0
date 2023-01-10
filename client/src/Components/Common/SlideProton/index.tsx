import { Slider } from "@mui/material";
import { ChangeEvent } from "react";
import { FunctionComponent } from "react";

interface SliderProtonProps {
  value: number;
  changePrice: (e: ChangeEvent<any>) => void;
}

const SliderProton: FunctionComponent<SliderProtonProps> = ({
  value,
  changePrice,
}) => {
  return (
    <div>
      <Slider
        value={value}
        onChange={changePrice}
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
