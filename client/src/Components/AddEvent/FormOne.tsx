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
import { ChangeEvent, FunctionComponent } from "react";
import SideAnimation from "./FirstSideAnimation";
import { Dayjs } from "dayjs";

interface FormOneProps {
  changeNewEvent: (event: ChangeEvent<any> | SelectChangeEvent<string>) => void;
  handleKeywordsSelected: (event: SelectChangeEvent<string[]>) => void;
  updateImage: (arrayImgs: any[]) => void;
  updateDate: (input: Dayjs | null) => void;
  tags: { tags: number[]; keywords: string[] };
  keywords: { category: string; id: string }[];
  imageUpload: any[];
  newEvent: {
    eventName: string;
    date: Dayjs;
    price: string;
    ageGroup: string;
    description: string;
    maxAttendees: string;
  };
}

export const FormOne: FunctionComponent<FormOneProps> = (props) => {
  let {
    changeNewEvent,
    tags,
    keywords,
    handleKeywordsSelected,
    updateImage,
    updateDate,
    imageUpload,
    newEvent,
  } = props;
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <TextField
                onChange={(value) => changeNewEvent(value)}
                value={newEvent.eventName}
                fullWidth
                margin="dense"
                name="eventName"
                label="Event Name"
              />
              <TextField
                onChange={(value) => changeNewEvent(value)}
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
                  onChange={updateDate}
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
                  onChange={(value) => changeNewEvent(value)}
                />
                <FormControl fullWidth>
                  <InputLabel id="ageGroup">Age</InputLabel>
                  <Select
                    labelId="ageGroup"
                    value={newEvent.ageGroup}
                    label="Age"
                    name="ageGroup"
                    onChange={changeNewEvent}
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
                  onChange={handleKeywordsSelected}
                  input={<OutlinedInput id="tags" label="tags" />}
                  renderValue={(selected: string[]) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value, i) => {
                        return <Chip key={i} label={value} />;
                      })}
                    </Box>
                  )}
                >
                  {keywords.map((keyword, index) => (
                    <MenuItem key={index} value={keyword.category}>
                      {keyword.category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <DropZone updateImage={updateImage} files={imageUpload} />
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
