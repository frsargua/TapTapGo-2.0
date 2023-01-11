import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card, CardContent, Grid, Toolbar } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import DropZone from "../Common/DropZone/index";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ChangeEvent, FunctionComponent } from "react";
import SideAnimation from "./SideAnimation";
import { AddressSearch } from "./AddressSearch";

interface FormOneProps {
  updateState: (event: ChangeEvent, setter: () => void) => void;
  newEvent: {
    eventName: string;
    date: null | Date;
    price: string;
    ageGroup: string;
    description: string;
    maxAttendees: string;
  };
}

export const FormOne: FunctionComponent<FormOneProps> = (props) => {
  let {
    ChangeNewEvent,
    updateState,
    tags,
    keywords,
    handleKeywords,
    updateImage,
    updateDate,
    eventAddress,
    imageUpload,
    setAddress,
    newEvent,
  } = props;
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <TextField
                onChange={(value) => ChangeNewEvent(value)}
                value={newEvent.eventName}
                fullWidth
                margin="dense"
                name="eventName"
                label="Event Name"
              />
              <TextField
                onChange={(value) => ChangeNewEvent(value)}
                value={newEvent.maxAttendees}
                fullWidth
                margin="dense"
                type="number"
                inputProps={{ min: 4, max: 10 }}
                name="maxAttendees"
                label="Max attendees"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start date"
                  disablePast
                  value={newEvent.date}
                  onChange={(newValue) => updateDate(newValue, "date")}
                  renderInput={(params) => (
                    <TextField margin="dense" fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  my: "0.4rem",
                }}
              >
                <TextField
                  name="price"
                  fullWidth
                  id="firstName"
                  label="Price"
                  type="number"
                  value={newEvent.price}
                  inputProps={{
                    max: 100,
                    min: 0,
                  }}
                  autoFocus
                  onChange={(value) => ChangeNewEvent(value)}
                />
                <FormControl fullWidth>
                  <InputLabel id="ageGroup">Age</InputLabel>
                  <Select
                    labelId="ageGroup"
                    value={newEvent.ageGroup}
                    label="Age"
                    name="ageGroup"
                    onChange={(value) => ChangeNewEvent(value)}
                  >
                    <MenuItem value={"Teenagers"}>Teenagers</MenuItem>
                    <MenuItem value={"Adult"}>Adult</MenuItem>
                    <MenuItem value={"Senior"}>Senior</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <FormControl fullWidth>
                <InputLabel id="tags">Keywords</InputLabel>
                <Select
                  labelId="tags"
                  multiple
                  value={tags.keywords}
                  onChange={handleKeywords}
                  input={<OutlinedInput id="tags" label="tags" />}
                  renderValue={(selected, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                      >
                        {selected.map((value, i) => {
                          return <Chip key={i} label={value} />;
                        })}
                      </Box>
                    );
                  }}
                >
                  {keywords.map((keyword, index) => (
                    <MenuItem key={index} value={keyword.tagName}>
                      {keyword.tagName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <DropZone updateImage={updateImage} files={imageUpload} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* <SideAnimation /> */}
          <AddressSearch
            updateState={updateState}
            setAddress={setAddress}
            eventAddress={eventAddress}
          />
        </Grid>
      </Grid>
    </>
  );
};
