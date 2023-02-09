import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, FunctionComponent } from "react";
import { categoryList, ratingList } from "../../../Constants/Index";
import CheckboxProton from "../../Common/CheckBoxProton/index";
import FilterListToggle from "../../Common/FilterListToggle/index";
import SliderProton from "../../Common/SlideProton/index";

interface CategoryProps {
  id: number;
  checked: boolean;
  label: string;
}
interface FilterPanelProps {
  selectedPrice: number[];
  selectedFrequency: string | null;
  selectedRating: number | null;
  selectedCategory: CategoryProps[];
  changeChecked: (id: number) => void;
  changePrice: (e: Event, newValue: number | number[]) => void;
  selectCategory: (e: ChangeEvent<any>, value: string) => void;
  selectRating: (e: ChangeEvent<any>, value: any) => void;
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
            category={category}
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
