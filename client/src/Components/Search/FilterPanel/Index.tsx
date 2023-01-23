import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, FunctionComponent } from "react";
import { categoryList, ratingList } from "../../../Constants/Index";
import CheckboxProton from "../../Common/CheckBoxProton/index";
import FilterListToggle from "../../Common/FilterListToggle/index";
import SliderProton from "../../Common/SlideProton/index";

interface CuisinesProps {
  id: number;
  checked: boolean;
  label: string;
}
interface FilterPanelProps {
  selectedFrequency: string | null;
  selectedCategory: CuisinesProps[];
  selectCategory: (e: ChangeEvent<any>, value: string) => void;
  selectedRating: number | null;
  selectedPrice: number[];
  selectRating: (e: ChangeEvent<any>, value: any) => void;
  changeChecked: (id: number) => void;
  changePrice: (e: Event, newValue: number | number[]) => void;
}

export const FilterPanel: FunctionComponent<FilterPanelProps> = (props) => {
  let {
    selectedCategory,
    selectedFrequency,
    selectCategory,
    selectedRating,
    selectedPrice,
    selectRating,
    changeChecked,
    changePrice,
  } = props;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          Frequency
        </Typography>
        <FilterListToggle
          options={categoryList}
          value={selectedFrequency}
          selectToggle={selectCategory}
        />
      </Box>
      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          Category
        </Typography>
        {selectedCategory?.map((category) => (
          <CheckboxProton
            key={category.id}
            cuisine={category}
            changeChecked={changeChecked}
          />
        ))}
      </Box>
      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h6" sx={{ marginBottom: "2.5rem" }}>
          Price
        </Typography>
        <SliderProton value={selectedPrice} changePrice={changePrice} />
      </Box>
      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          Rating
        </Typography>{" "}
        <FilterListToggle
          options={ratingList}
          value={selectedRating}
          selectToggle={selectRating}
        />
      </Box>
    </Box>
  );
};
