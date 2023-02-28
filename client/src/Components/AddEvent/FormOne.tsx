import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Card, CardContent, Grid, Toolbar } from "@mui/material";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import DropZone from "../Common/DropZone/index";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  ChangeEvent,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import SideAnimation from "./FirstSideAnimation";
import dayjs, { Dayjs } from "dayjs";
import { useQuery } from "@apollo/client";
import { QUERY_TAGS, QUERY_FREQUENCY_TYPES } from "../../graphQL/Queries";
import { CreateEventContext } from "../../contexts/CreateEventContext";

interface FormOneProps {}

export const FormOne: FunctionComponent<FormOneProps> = (props) => {
  let {
    eventDetails,
    setKeywords,
    keywords,
    setFrequencies,
    frequencies,
    imageUpload,
    updateDate,
    changeNewEvent,
    changeFrequency,
    updateTagsSelected,
    updateImageState,
    tags,
  } = useContext(CreateEventContext);

  const { data } = useQuery(QUERY_TAGS);
  const { data: frequenciesFromDB } = useQuery(QUERY_FREQUENCY_TYPES);

  useEffect(() => {
    if (data?.QueryAllCategories?.length) {
      setKeywords(data.QueryAllCategories);
    }
  }, [data]);

  useEffect(() => {
    if (frequenciesFromDB?.QueryAllFrequencyTypes) {
      setFrequencies(frequenciesFromDB.QueryAllFrequencyTypes);
    }
  }, [frequenciesFromDB]);

  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <form>
                <TextField
                  onChange={(value) => changeNewEvent(value)}
                  value={eventDetails.eventName}
                  fullWidth
                  margin="dense"
                  name="eventName"
                  label="Event Name"
                  required
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start date"
                      disablePast
                      value={eventDetails.date}
                      onChange={updateDate}
                      renderInput={(params) => (
                        <TextField
                          required
                          margin="dense"
                          sx={{ width: "50%" }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <TextField
                    onChange={(value) => changeNewEvent(value)}
                    value={eventDetails.maxAttendees}
                    fullWidth
                    margin="dense"
                    type="number"
                    inputProps={{ min: 4, max: 10 }}
                    name="maxAttendees"
                    label="Max attendees"
                    sx={{ width: "50%" }}
                    required
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    my: "0.4rem",
                  }}
                >
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="ageGroup">Age</InputLabel>
                    <Select
                      labelId="ageGroup"
                      value={eventDetails.ageGroup}
                      label="Age"
                      name="ageGroup"
                      onChange={changeNewEvent}
                      required
                    >
                      <MenuItem value={"Teenagers"}>Teenagers</MenuItem>
                      <MenuItem value={"Adult"}>Adult</MenuItem>
                      <MenuItem value={"Senior"}>Senior</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="frequency">frequency</InputLabel>
                    <Select
                      labelId="frequency"
                      value={eventDetails.frequency.frequency}
                      label="frequency"
                      name="frequency"
                      onChange={changeFrequency}
                      required
                    >
                      {frequencies.map((keyword, index) => (
                        <MenuItem key={index} value={keyword.frequency}>
                          {keyword.frequency}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <FormControl fullWidth>
                  <InputLabel id="tags">Keywords</InputLabel>
                  <Select
                    labelId="tags"
                    multiple
                    label="Keywords"
                    value={tags.keywords}
                    onChange={updateTagsSelected}
                    input={<OutlinedInput id="tags" label="tags" />}
                    renderValue={(selected: string[]) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value, i) => {
                          return <Chip key={i} label={value} />;
                        })}
                      </Box>
                    )}
                    required
                  >
                    {keywords.map((keyword, index) => (
                      <MenuItem key={index} value={keyword.category}>
                        {keyword.category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <DropZone updateImage={updateImageState} files={imageUpload} />
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <SideAnimation />
        </Grid>
      </Grid>
    </>
  );
};
