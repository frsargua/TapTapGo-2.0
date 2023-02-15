import { Box } from "@mui/system";
import { FunctionComponent } from "react";
import { Button } from "@mui/material";

interface NavigationButtonsProps {
  formNumber: number;
  handlePreviousForm: () => void;
  handleNextForm: () => void;
}

export const NavigationButtons: FunctionComponent<NavigationButtonsProps> = (
  props
) => {
  let { formNumber, handlePreviousForm, handleNextForm } = props;

  return (
    <>
      {(formNumber == 1 || formNumber == 2) && (
        <Button
          color="primary"
          onClick={handleNextForm}
          fullWidth
          variant="contained"
          sx={{ my: "0.2rem" }}
        >
          Next
        </Button>
      )}
      {formNumber === 3 && (
        <Button
          color="warning"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ my: "0.2rem" }}
        >
          Submit
        </Button>
      )}
      {(formNumber == 2 || formNumber == 3) && (
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          onClick={handlePreviousForm}
          sx={{ my: "0.2rem" }}
        >
          Previous
        </Button>
      )}
    </>
  );
};
