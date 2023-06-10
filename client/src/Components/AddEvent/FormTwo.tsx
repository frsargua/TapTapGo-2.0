import { useState, useContext } from "react";
import {
  TextField,
  Typography,
  IconButton,
  Button,
  Container,
  Box,
  Grid,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import dayjs from "dayjs";
import { v1 as uuidv1 } from "uuid";
import { CreateEventContext } from "../../contexts/CreateEventContext";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface FormTwoProps {}

const FormTwo: React.FC<FormTwoProps> = () => {
  const {
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
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Create Ticket Types
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button variant="contained" onClick={addOption}>
          Add
        </Button>
        <Button variant="contained" onClick={removeOption}>
          Less
        </Button>
      </Box>
      {optionSelectedByUser.map((data, index) => (
        <Box
          key={index}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            p: 2,
            mb: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Ticket Type
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
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
                      value={el.name}
                      disabled={el.selected}
                    >
                      {el.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name={data.id}
                value={data.price}
                label="Price"
                type="number"
                onChange={handlePriceChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                locale={dayjs.locale("en")}
              >
                <DatePicker
                  label="Expiration Date"
                  disablePast
                  value={data.expirationDate}
                  onChange={(date) => handleExpirationDateChange(date, data.id)}
                  renderInput={(params) => (
                    <TextField required name={data.id} {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name={data.id}
                value={data.description}
                label="Description"
                fullWidth
                onChange={handleDescriptionChange}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </Container>
  );
};

export default FormTwo;
