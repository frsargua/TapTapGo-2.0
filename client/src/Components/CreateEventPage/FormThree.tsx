import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { CreateEventContext } from "../../contexts/CreateEventContext";
import AddressInput from "./FormThree/AddressInput";
import AddressDropdown from "./FormThree/AddressDropdown";
import SelectedAddress from "./FormThree/SelectedAddressForm";
import Map from "./FormThree/MapComponent";
import FormSkeleton from "./FormThree/FormSkeleton";

const googleApiKey = import.meta.env.VITE_API_KEY;

interface FormThreeProps {}

const FormThree: FunctionComponent<FormThreeProps> = () => {
  let { eventAddress, handleAddressChange, setAddress } =
    useContext(CreateEventContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [predictions, setPredictions] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.GeocoderResult | null>(null);
  const [geocodingResults, setGeocodingResults] = useState<
    google.maps.GeocoderResult[]
  >([]);

  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const apiKey = googleApiKey;

  const handlePredictionClick = (prediction: string, index: number) => {
    setSearchTerm(prediction);
    setPredictions([]);
    setLoading(true);
    setSelectedPlace(geocodingResults[index]);

    const place = geocodingResults[index];
    const addressComponents = place.address_components;

    const line1 = addressComponents?.find((component) =>
      component.types.includes("street_number")
    )?.long_name;
    const city = addressComponents?.find((component) =>
      component.types.includes("locality")
    )?.long_name;
    const country = addressComponents?.find((component) =>
      component.types.includes("country")
    )?.long_name;
    const postcode = addressComponents?.find((component) =>
      component.types.includes("postal_code")
    )?.long_name;

    let newAddress = {
      postcode: postcode || "",
      firstLine: line1,
      secondLine: "",
      city: city || "",
      latitude: "",
      longitude: "",
    };

    setAddressLine1(line1 || "");
    setCity(city || "");
    setCountry(country || "");
    setPostcode(postcode || "");

    const location = place.geometry?.location;
    if (location) {
      setLatitude(location.lat().toFixed(6));
      setLongitude(location.lng().toFixed(6));
      newAddress.latitude = location.lat().toFixed(6);
      newAddress.longitude = location.lng().toFixed(6);
    }

    setAddress(() => newAddress);
    setLoading(false);
  };

  useEffect(() => {
    if (searchTerm) {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode(
        { address: searchTerm, region: "uk" },
        (results, status) => {
          if (status === "OK" && results) {
            const newPredictions = results.map(
              (result) => result.formatted_address
            );
            setPredictions(newPredictions);
            setGeocodingResults(results);
          } else {
            setPredictions([]);
            setGeocodingResults([]);
          }
        }
      );
    } else {
      setPredictions([]);
      setGeocodingResults([]);
    }
  }, [searchTerm]);

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={6}>
            <Card sx={{ mt: 4 }}>
              <CardContent sx={{ width: "100%", height: "100%" }}>
                <Typography variant="h5" component="div" gutterBottom>
                  Address Finder
                </Typography>
                <AddressInput
                  searchTerm={searchTerm}
                  onInputChange={handleInputChange}
                />
                {predictions.length > 0 && (
                  <AddressDropdown
                    predictions={predictions}
                    onPredictionClick={handlePredictionClick}
                  />
                )}
                {selectedPlace ? <SelectedAddress /> : <FormSkeleton />}
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Map selectedPlace={selectedPlace} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FormThree;
