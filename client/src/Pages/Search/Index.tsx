import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, useEffect } from "react";
import { FunctionComponent } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SingleEventCard } from "../../Components/EventCard";
import { FilterPanel } from "../../Components/Landing/FilterPanel/Index";
import { SearchBar } from "../../Components/Landing/Search";
import { dataList } from "../../Constants/Index";

interface SearchProps {}

const Search: FunctionComponent<SearchProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(null);
  const [selectedRating, setSelectedRating] = useState<number>(null);
  const [selectedPrice, setSelectedPrice] = useState<number[]>([0, 100]);
  const [cuisines, setCuisines] = useState<
    { id: number; checked: boolean; label: string }[]
  >([
    { id: 1, checked: false, label: "Bachata" },
    { id: 2, checked: false, label: "Salsa" },
    { id: 3, checked: false, label: "Kizomba" },
  ]);
  const [list, setList] = useState(dataList);

  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const { city } = useParams();

  const handleSelectCategory = (event, value) =>
    !value ? null : setSelectedCategory(value);

  const handleSelectRating = (event, value) => {
    console.log(value);
    !value ? null : setSelectedRating(value);
  };

  const handleChangeChecked = (id) => {
    const cusinesStateList = cuisines;
    const changeCheckedCuisines = cusinesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCuisines(changeCheckedCuisines);
  };

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const applyFilters = () => {
    let updatedList = dataList;

    // Rating Filter
    if (selectedRating) {
      updatedList = updatedList.filter(
        (item) => parseInt(item.rating) >= parseInt(selectedRating)
      );
    }

    // Category Filter
    if (selectedCategory) {
      updatedList = updatedList.filter(
        (item) => item.category === selectedCategory
      );
    }

    // Cuisine Filter
    const cuisinesChecked = cuisines
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (cuisinesChecked.length) {
      updatedList = updatedList.filter((item) =>
        cuisinesChecked.includes(item.cuisine)
      );
    }

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.eventName
            .toLowerCase()
            .search(searchInput.toLowerCase().trim()) !== -1
      );
    }

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedRating, selectedCategory, cuisines, searchInput, selectedPrice]);
  return (
    <>
      <Container maxWidth="xl">
        <Box className="section__block-14">
          <Typography variant="h2" textAlign="center" mt={4}>
            Events in <span style={{ fontWeight: "500" }}> {city}</span>
          </Typography>
          <SearchBar
            value={searchInput}
            changeInput={(e) => setSearchInput(e.target.value)}
          />

          <Grid
            container
            mt="1rem"
            columnSpacing={4}
            justifyContent="space-between"
            width="100%"
            className="section__block-4"
          >
            <Grid
              item
              xs={12}
              md={2}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Link to={`/map/${city}`}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="success"
                  sx={{ mb: "1rem" }}
                >
                  Map
                </Button>
              </Link>

              <FilterPanel
                selectedCategory={selectedCategory}
                selectCategory={handleSelectCategory}
                selectedRating={selectedRating}
                selectedPrice={selectedPrice}
                selectRating={handleSelectRating}
                cuisines={cuisines}
                changeChecked={handleChangeChecked}
                changePrice={handleChangePrice}
              />
            </Grid>
            <Grid item xs={12} md={10}>
              <Grid container spacing={2}>
                {list.length > 0 ? (
                  list.map((el, i) => {
                    return (
                      <Grid key={el._id} item xs={11} sm={10} md={4} lg={3}>
                        <SingleEventCard {...el} />
                      </Grid>
                    );
                  })
                ) : (
                  <Stack>
                    <Typography textAlign="center" variant="h2">
                      No events in this area
                    </Typography>
                  </Stack>
                )}
              </Grid>
              <Box
                sx={{
                  backgroundColor: "white",
                  width: "100vw",
                  height: "100vh",
                  left: "0",
                  top: "0",
                  display: { xs: "flex", md: "none" },
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  position: "fixed",
                  px: "2rem",
                }}
              >
                <FilterPanel
                  selectedCategory={selectedCategory}
                  selectCategory={handleSelectCategory}
                  selectedRating={selectedRating}
                  selectedPrice={selectedPrice}
                  selectRating={handleSelectRating}
                  cuisines={cuisines}
                  changeChecked={handleChangeChecked}
                  changePrice={handleChangePrice}
                />
                <Button fullWidth size="large" variant="contained">
                  Close
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Search;
