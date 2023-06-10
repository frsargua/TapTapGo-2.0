import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  MarkerF,
  OverlayView,
} from "@react-google-maps/api";

import { Link, useParams } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
type SearchProps = {
  markerData: any[];
  setSelected: (s: string) => void;
  inputEl: any;
};

export default function Map(props: SearchProps) {
  let { markerData, inputEl, setSelected } = props;
  const { cityName } = useParams<string>();
  const [localisation, setLocalisation] = useState<LatLngLiteral>({
    lat: 51.509865,
    lng: -0.118092,
  });
  const [selectedMarker, setSelectedMarker] = useState<{
    id: string;
    position: LatLngLiteral;
  } | null>(null);

  const [office, setOffice] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const mapRef = useRef<GoogleMap>();
  const { setValue, clearSuggestions } = usePlacesAutocomplete({
    debounce: 300,
  });

  const getLatLongFromString = async (val: string): Promise<any> => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);

    setLocalisation({ lat, lng });
    setOffice({ lat, lng });
  };

  useEffect(() => {
    getLatLongFromString(cityName as string);
  }, []);

  const center = useMemo<LatLngLiteral>(() => localisation, [localisation]);

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "b181cac70f27f5e6",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const fetchDirections = (house: LatLngLiteral, houseId: any) => {
    if (!office) return;
    console.log(house);

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: office,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        console.log(house);
        if (status === "OK" && result) {
          setDirections(result);
          setSelectedMarker({ spotData: houseId, position: house }); // Set the selected marker ID and position
        }
      }
    );
  };

  return (
    <div className="container">
      <div className="map">
        <GoogleMap
          zoom={14}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {office && (
            <>
              {" "}
              {markerData.map((spot, index) => {
                return (
                  <>
                    <Marker
                      key={index}
                      position={{
                        lat: spot.coordinates.lat,
                        lng: spot.coordinates.lng,
                      }}
                      onClick={() => {
                        fetchDirections(
                          {
                            lat: spot.coordinates.lat,
                            lng: spot.coordinates.lng,
                          },
                          spot
                        );
                        setSelected(spot._id);
                        inputEl?.current?.focus();
                      }}
                    />
                  </>
                );
              })}
            </>
          )}
          {selectedMarker && (
            <OverlayView
              position={selectedMarker.position}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <Link
                to={`/event/${selectedMarker.spotData._id}`}
                target="_blank"
              >
                <Card sx={{ maxWidth: 300, maxHeight: "200" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      "https://firebasestorage.googleapis.com/v0/b/taptapgo2.appspot.com/o/Stock%20Images%2F4014896a9e708a567e6b05936a0ce434784c8cd71c794c1148ac426168129bc2-rimg-w960-h507-gmir.jpg?alt=media&token=52014dff-f067-49ca-9c1c-5d8a8b7a38f9"
                    }
                    alt={selectedMarker.spotData.eventName}
                  />
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {selectedMarker.spotData.eventName}
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                      Price: ${selectedMarker.spotData.price}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Frequency: {selectedMarker.spotData.frequency}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Rating: {selectedMarker.spotData.rating}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </OverlayView>
          )}
          <Circle center={office} radius={5000} options={closeOptions} />;
        </GoogleMap>
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
