import { TextField, Typography, IconButton, Button } from "@mui/material";
import { Box } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { v1 as uuidv1 } from "uuid";
import { CreateEventContext } from "../../contexts/CreateEventContext";

interface FormTwoProps {}

export const FormTwo: FunctionComponent<FormTwoProps> = () => {
  let {
    optionSelectedByUser,
    optionsAvailable,
    addOption,
    removeOption,
    handleChange,
    handlePriceChange,
    handleDescriptionChange,
    handleExpirationDateChange,
  } = useContext(CreateEventContext);

  return (
    <>
      <Typography variant="h3" textAlign="center">
        Create Tickets Types
      </Typography>
      <Button onClick={addOption}>Add</Button>
      <Button onClick={removeOption}>Less</Button>
      {optionSelectedByUser.map((data, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: "1rem",
          }}
        >
          <FormControl sx={{ width: "300px" }}>
            <InputLabel id="demo-simple-select-label">Ticket Type</InputLabel>
            <Select
              required
              aria-label="name"
              value={data.ticketName}
              name={data.id}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {optionsAvailable.map((el, index) => (
                <MenuItem
                  key={index}
                  value={`${el.name}`}
                  disabled={el.selected}
                >
                  {el.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name={data.id}
            value={data.price}
            label="price"
            type="number"
            onChange={handlePriceChange}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Expiration date"
              disablePast
              onChange={(input) => handleExpirationDateChange(input, data.id)}
              value={data.expirationDate}
              renderInput={(params) => (
                <TextField required name={data.id} {...params} />
              )}
            />
          </LocalizationProvider>
          <TextField
            name={data.id}
            value={data.description}
            label="description"
            fullWidth
            onChange={handleDescriptionChange}
          />
        </Box>
      ))}
    </>
  );
};
