import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, Grid } from "@mui/material";
import { FunctionComponent } from "react";

interface FormTwoProps {
  ChangeNewEvent: (event: ChangeEvent<any>) => void;
  handleFormSwitch: () => void;
  newEvent: {
    eventName: string;
    date: null | Date;
    price: string;
    ageGroup: string;
    description: string;
    maxAttendees: string;
  };
}

export const FormTwo: FunctionComponent<FormTwoProps> = (props) => {
  let { ChangeNewEvent, handleFormSwitch, newEvent } = props;

  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2} component="form">
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TextField
                onChange={(value) => ChangeNewEvent(value)}
                value={newEvent.description}
                fullWidth
                multiline
                sx={{ border: "none" }}
                rows={12}
                name="description"
                label="Description"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
