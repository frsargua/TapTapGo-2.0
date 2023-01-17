import TextField from "@mui/material/TextField";
import { Card, CardContent, Grid, Toolbar } from "@mui/material";
import { ChangeEvent, FunctionComponent } from "react";
import SecondSideAnimation from "./SecondSideAnimation";

interface FormTwoProps {
  handleAddressChange: (event: ChangeEvent) => void;
  eventAddress: {
    country: string;
    buildingNumber: string;
    firstLine: string;
    secondLine: string;
    cityName: string;
    postcode: string;
  };
}

export const FormTwo: FunctionComponent<FormTwoProps> = (props) => {
  let { handleAddressChange, eventAddress } = props;
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <TextField
                onChange={handleAddressChange}
                value={eventAddress.postcode}
                fullWidth
                margin="dense"
                type="number"
                inputProps={{ min: 4, max: 10 }}
                name="postcode"
                label="Postcode"
              />
              <TextField
                onChange={handleAddressChange}
                value={eventAddress.buildingNumber}
                fullWidth
                margin="dense"
                name="buildingNumber"
                label="Building Number"
              />
              <TextField
                onChange={handleAddressChange}
                value={eventAddress.firstLine}
                fullWidth
                margin="dense"
                type="number"
                inputProps={{ min: 4, max: 10 }}
                name="firstLine"
                label="Street Name"
              />
              <TextField
                onChange={handleAddressChange}
                value={eventAddress.secondLine}
                fullWidth
                margin="dense"
                type="number"
                inputProps={{ min: 4, max: 10 }}
                name="secondLine"
                label="Max attendees"
              />
              <TextField
                onChange={handleAddressChange}
                value={eventAddress.cityName}
                fullWidth
                margin="dense"
                type="text"
                name="cityName"
                label="City"
              />
              <TextField
                onChange={handleAddressChange}
                value={eventAddress.cityName}
                fullWidth
                margin="dense"
                type="text"
                name="county"
                label="County"
              />
              <TextField
                onChange={handleAddressChange}
                value={eventAddress.country}
                fullWidth
                margin="dense"
                name="eventName"
                label="Country"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <SecondSideAnimation />
        </Grid>
      </Grid>
    </>
  );
};
