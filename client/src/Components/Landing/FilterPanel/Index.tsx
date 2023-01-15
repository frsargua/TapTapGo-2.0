import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, FunctionComponent } from "react";
import { categoryList, ratingList } from "../../../Constants/Index";
import CheckboxProton from "../../Common/CheckBoxProton/index";
import FilterListToggle from "../../Common/FilterListToggle/index";
import SliderProton from "../../Common/SlideProton/index";

interface FilterPanelProps {
  selectedCategory: string;
  selectCategory: (e: ChangeEvent<any>, value: string) => void;
  selectedRating: number;
  selectedPrice: number[];
  selectRating: (e: ChangeEvent<any>, value: any) => void;
  cuisines: { id: number; checked: boolean; label: string }[];
  changeChecked: (e: ChangeEvent<any>, value: boolean) => void;
  changePrice: (e: ChangeEvent<any>, value: number[]) => void;
}

export const FilterPanel: FunctionComponent<FilterPanelProps> = (props) => {
  const {
    selectedCategory,
    selectCategory,
    selectedRating,
    selectedPrice,
    selectRating,
    cuisines,
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
          value={selectedCategory}
          selectToggle={selectCategory}
        />
      </Box>
      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          Category
        </Typography>{" "}
        {cuisines.map((cuisine) => (
          <CheckboxProton
            key={cuisine.id}
            cuisine={cuisine}
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
