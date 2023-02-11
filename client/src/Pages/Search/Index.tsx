import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, useEffect } from "react";
import { FunctionComponent } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SingleEventCard } from "../../Components/Common/EventCard";
import { FilterPanel } from "../../Components/Search/FilterPanel/Index";
import { SearchBar } from "../../Components/Search/SearchBar";
import { dataList, categories } from "../../Constants/Index";
import { useQuery } from "@apollo/client";
import { SEARCH_EVENTS_CITY } from "../../graphQL/Queries";
import { URLParamsTypes } from "../../utils/types";

interface SearchProps {}

interface CategoryProps {
  id: number;
  checked: boolean;
  label: string;
}

const Search: FunctionComponent<SearchProps> = () => {
  const { city } = useParams<URLParamsTypes>();

  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps[]>(categories);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number[]>([0, 100]);
  const [list, setList] = useState<any[]>([]);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSelectCategory = (event: ChangeEvent<any>, value: string) => {
    if (selectedFrequency == value) {
      setSelectedFrequency(null);
    } else {
      !value ? null : setSelectedFrequency(value);
    }
  };

  const handleSelectRating = (event: ChangeEvent<any>, value: number) => {
    if (selectedRating == value) {
      setSelectedRating(null);
    } else {
      !value ? null : setSelectedRating(value);
    }
  };

  const handleChangeChecked = (id: number) => {
    const categoriesStateList = selectedCategory;

    const changeCheckedCategories = categoriesStateList.map((item) =>
      item.id == id ? { ...item, checked: !item.checked } : item
    );
    setSelectedCategory(changeCheckedCategories);
  };

  const handleChangePrice = (e: Event, newValue: number | number[]) => {
    setSelectedPrice(newValue as number[]);
  };

  const applyFilters = async () => {
    let updatedList =
      data?.QueryEventsByCity?.length > 0 ? data?.QueryEventsByCity : [];

    // Rating Filter
    if (selectedRating) {
      updatedList = updatedList.filter(
        (item: any) => item.rating >= selectedRating
      );
    }

    // Frequency Filter
    if (selectedFrequency) {
      updatedList = await updatedList.filter(
        (item: any) => item.frequency.frequency === selectedFrequency
      );
    }
    // Category Filter
    const categoryChecked = selectedCategory
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (categoryChecked.length) {
      updatedList = updatedList.filter((item: any) => {
        let found = false;
        item.categories.forEach((category: any) => {
          found = categoryChecked.includes(category.category.toLowerCase());
        });

        return found;
      });
    }

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item: any) =>
          item.eventName
            .toLowerCase()
            .search(searchInput.toLowerCase().trim()) !== -1
      );
    }

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item: any) => item.price >= minPrice && item.price <= maxPrice
    );

    // Updating state
    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  const { loading, data } = useQuery(SEARCH_EVENTS_CITY, {
    variables: { cityParam: city },
  });

  useEffect(() => {
    applyFilters();
  }, [
    selectedRating,
    selectedFrequency,
    selectedCategory,
    searchInput,
    selectedPrice,
  ]);

  useEffect(() => {
    if (data?.QueryEventsByCity?.length) {
      setList(data?.QueryEventsByCity);
    }
  }, [data]);

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
                selectedFrequency={selectedFrequency}
                selectedCategory={selectedCategory}
                selectedRating={selectedRating}
                selectedPrice={selectedPrice}
                selectCategory={handleSelectCategory}
                selectRating={handleSelectRating}
                changeChecked={handleChangeChecked}
                changePrice={handleChangePrice}
              />
            </Grid>
            <Grid item xs={12} md={10}>
              <Grid container spacing={2}>
                {!loading && !resultsFound ? (
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
                  selectedFrequency={selectedFrequency}
                  selectedCategory={selectedCategory}
                  selectedRating={selectedRating}
                  selectedPrice={selectedPrice}
                  selectCategory={handleSelectCategory}
                  selectRating={handleSelectRating}
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
