import { TextField, Typography, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import { FunctionComponent, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

interface FormTwoProps {}

export const FormTwo: FunctionComponent<FormTwoProps> = () => {
  const [optionsAvailable, setOptionsAvailable] = useState<any>([
    { name: "standard", selected: false },
    { name: "premiun", selected: false },
    { name: "delux", selected: false },
  ]);
  const [optionSelectedByUser, setOptionSelectedByUser] = useState<any>([
    {
      id: "1",
      show: false,
      name: "",
      price: "",
      date: dayjs().format("YYYY-MM-DD"),
      label: "option 1",
    },
    {
      id: "2",
      show: false,
      name: "",
      price: "",
      date: dayjs().format("YYYY-MM-DD"),
      label: "option 2",
    },
    {
      id: "3",
      show: false,
      name: "",
      price: "",
      date: dayjs().format("YYYY-MM-DD"),
      label: "option 3",
    },
  ]);

  const toggleCheckbox = (nameInput: string) => {
    setOptionSelectedByUser((prev: any) => {
      return prev.map((el: any) => {
        if (el.label == nameInput) {
          console.log(el);
          console.log(el.show);
          if (el.show) {
            el.price = "";
            el.date = dayjs().format("YYYY-MM-DD");
          }
          el.show = !el.show;
        }
        return el;
      });
    });
  };

  const handleChange = (event: any) => {
    console.log(event.target);
    let { name: fieldIdentifier, value } = event.target;

    setOptionsAvailable((prev: any) => {
      return prev.map((el: any) => {
        optionSelectedByUser.forEach((element: any) => {
          if (element.id == fieldIdentifier && element.name !== "") {
            if (el.name == element.name) {
              el.selected = !el.selected;
            }
          }
        });

        if (el.name == value) {
          el.selected = !el.selected;
        }

        return el;
      });
    });

    setOptionSelectedByUser((prev: any) => {
      return prev.map((el: any) => {
        if (el.id == fieldIdentifier) {
          el.name = value;
        }
        return el;
      });
    });
  };

  const handlePriceChange = (event: any) => {
    let { name: fieldIdentifier, value: newPrice } = event.target;

    setOptionSelectedByUser((prev: any) => {
      return prev.map((el: any) => {
        if (el.id == fieldIdentifier) {
          el.price = newPrice;
        }
        return el;
      });
    });
  };

  const handleExpirationDateChange = (
    input: Dayjs | null,
    fieldIdentifier: number
  ) => {
    setOptionSelectedByUser((prev: any) => {
      return prev.map((el: any) => {
        if (el.id == fieldIdentifier) {
          el.date = input?.format("YYYY-MM-DD");
        }
        return el;
      });
    });
  };

  useEffect(() => {
    // console.log(optionSelectedByUser);
  }, [optionSelectedByUser]);

  return (
    <>
      <Typography variant="h3" textAlign="center">
        Create Tickets Types
      </Typography>

      {optionSelectedByUser.map((el) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <InputLabel>{el.label}</InputLabel>
              <Checkbox onClick={() => toggleCheckbox(el.label)} />
            </Box>
            {el.show && (
              <>
                <FormControl sx={{ width: "300px" }}>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    aria-label="name"
                    value={el.name}
                    name={el.id}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {optionsAvailable.map((el) => (
                      <MenuItem value={`${el.name}`} disabled={el.selected}>
                        {el.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  name={el.id}
                  value={el.price}
                  label="price"
                  aria-label="price"
                  onChange={handlePriceChange}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    aria-label="date"
                    label="Start date"
                    disablePast
                    onChange={(input) =>
                      handleExpirationDateChange(input, el.id)
                    }
                    value={el.date}
                    renderInput={(params) => (
                      <TextField
                        required
                        name={el.id}
                        margin="dense"
                        sx={{ width: "50%" }}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </>
            )}
          </Box>
        );
      })}
    </>
  );
};
