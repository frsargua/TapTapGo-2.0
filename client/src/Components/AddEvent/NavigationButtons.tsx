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
        >
          Next
        </Button>
      )}
      {(formNumber == 2 || formNumber == 3) && (
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          onClick={handlePreviousForm}
        >
          Previous
        </Button>
      )}
      {formNumber === 3 && (
        <Button color="info" type="submit" fullWidth variant="contained">
          Submit
        </Button>
      )}
    </>
  );
};
