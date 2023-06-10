import React, { FunctionComponent } from "react";
import { Button, Grid } from "@mui/material";

interface NavigationButtonsProps {
  formNumber: number;
  handlePreviousForm: () => void;
  handleNextForm: () => void;
}

export const NavigationButtons: FunctionComponent<NavigationButtonsProps> = (
  props
) => {
  const { formNumber, handlePreviousForm, handleNextForm } = props;

  return (
    <Grid container spacing={2} justifyContent="flex-end">
      {formNumber >= 2 && formNumber <= 4 && (
        <Grid item>
          <Button
            variant="outlined"
            fullWidth
            onClick={handlePreviousForm}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderColor: "#999",
            }}
          >
            Previous
          </Button>
        </Grid>
      )}
      {formNumber < 4 && (
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextForm}
            fullWidth
            sx={{
              textTransform: "none",
              fontWeight: 600,
              bgcolor: "#4caf50",
              "&:hover": { bgcolor: "#45a249" },
            }}
          >
            Next
          </Button>
        </Grid>
      )}
      {formNumber >= 4 && (
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            fullWidth
            sx={{
              textTransform: "none",
              fontWeight: 600,
              bgcolor: "#f44336",
              "&:hover": { bgcolor: "#e53935" },
            }}
          >
            Submit
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
