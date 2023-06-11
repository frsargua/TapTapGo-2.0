import { useState, useContext, useEffect, FunctionComponent } from "react";
import {
  Card,
  CardContent,
  Container,
  Grid,
  OutlinedInput,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useQuery } from "@apollo/client";

import DropZone from "../Common/FileUploadDropZone/index";
import SideAnimation from "./Animations/FirstSideAnimation";

import { QUERY_TAGS, QUERY_FREQUENCY_TYPES } from "../../graphQL/Queries";
import { CreateEventContext } from "../../contexts/CreateEventContext";

interface FormOneProps {}

const FormOne: FunctionComponent<FormOneProps> = (props) => {
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
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Event Details
                </Typography>
                <TextField
                  onChange={(event) => changeNewEvent(event)}
                  value={eventDetails.eventName}
                  fullWidth
                  margin="normal"
                  name="eventName"
                  label="Event Name"
                  required
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={(event) => changeNewEvent(event)}
                      value={eventDetails.maxAttendees}
                      fullWidth
                      margin="normal"
                      type="number"
                      inputProps={{ min: 4, max: 10 }}
                      name="maxAttendees"
                      label="Max Attendees"
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="ageGroup">Age Group</InputLabel>
                      <Select
                        labelId="ageGroup"
                        value={eventDetails.ageGroup}
                        label="Age Group"
                        name="ageGroup"
                        onChange={changeNewEvent}
                        required
                      >
                        <MenuItem value={"Teenagers"}>Teenagers</MenuItem>
                        <MenuItem value={"Adult"}>Adult</MenuItem>
                        <MenuItem value={"Senior"}>Senior</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="frequency">Frequency</InputLabel>
                      <Select
                        labelId="frequency"
                        value={eventDetails.frequency.frequency}
                        label="Frequency"
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
                  </Grid>
                </Grid>

                <FormControl fullWidth style={{ marginTop: "1rem" }}>
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
                        {selected.map((value, i) => (
                          <Chip key={i} label={value} />
                        ))}
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
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <SideAnimation />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FormOne;
