import { Typography, TextField, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { CreateEventContext } from "../../../contexts/CreateEventContext";
import { useContext } from "react";

const Container = styled("div")({
  marginTop: "1.5rem",
});

const Label = styled("label")({
  display: "block",
  marginBottom: "0.5rem",
  fontWeight: "bold",
  fontSize: "0.875rem",
});

const TextFieldWrapper = styled("div")({
  marginBottom: "1rem",
});

type SelectedAddressProps = {};

const SelectedAddress: React.FC<SelectedAddressProps> = () => {
  let { eventAddress, handleAddressChange } = useContext(CreateEventContext);

  let { postcode, firstLine, secondLine, city, latitude, longitude } =
    eventAddress;
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Selected Address:
      </Typography>
      <TextFieldWrapper>
        <TextField
          id="addressLine1"
          onChange={handleAddressChange}
          name="firstLine"
          fullWidth
          value={firstLine || ""}
          label="Address Line 1"
          placeholder="Enter address line 1"
        />
      </TextFieldWrapper>

      <TextFieldWrapper>
        <TextField
          id="addressLine2"
          onChange={handleAddressChange}
          name="secondLine"
          fullWidth
          label="Address Line 2"
          value={secondLine || ""}
          placeholder="Enter address line 2"
        />
      </TextFieldWrapper>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="city"
            onChange={handleAddressChange}
            name="city"
            fullWidth
            value={city || ""}
            placeholder="Enter city"
            label="City"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="postcode"
            onChange={handleAddressChange}
            name="postcode"
            fullWidth
            value={postcode || ""}
            label="City"
            placeholder="Postcode"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="latitude"
            label="Latitude"
            fullWidth
            value={latitude || ""}
            placeholder="Enter latitude"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="longitude"
            fullWidth
            label="Longitude"
            value={longitude || ""}
            placeholder="Enter longitude"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SelectedAddress;
