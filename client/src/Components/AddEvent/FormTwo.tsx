import TextField from "@mui/material/TextField";
import { Card, CardContent, Grid, Toolbar } from "@mui/material";
import { ChangeEvent, FunctionComponent } from "react";
import SecondSideAnimation from "./SecondSideAnimation";

interface FormTwoProps {
  handleAddressChange: (event: ChangeEvent) => void;
  eventAddress: {
    postcode: string;
    firstLine: string;
    secondLine: string;
    city: string;
    latitude: string;
    longitude: string;
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
                name="postcode"
                label="Postcode"
                required
              />
              <TextField
                onChange={handleAddressChange}
                value={eventAddress.firstLine}
                fullWidth
                margin="dense"
                name="firstLine"
                label="First Line"
                required
              />
              <TextField
                onChange={handleAddressChange}
                value={eventAddress.secondLine}
                fullWidth
                margin="dense"
                name="secondLine"
                label="Second Line"
              />

              <TextField
                onChange={handleAddressChange}
                value={eventAddress.city}
                fullWidth
                margin="dense"
                type="text"
                name="city"
                label="City"
                required
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
