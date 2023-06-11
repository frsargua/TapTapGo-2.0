import { useLoadScript } from "@react-google-maps/api";

import { useState, useMemo, useRef, useEffect, FunctionComponent } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { Card, CardContent } from "@mui/material";

interface EventMapComponentProps {
  location: { lat: number; lng: number };
}
type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

export const EventMapComponent: FunctionComponent<EventMapComponentProps> = (
  props
) => {
  let { location } = props;
  console.log(location);
  var newFormat = { lat: undefined, lng: undefined };
  newFormat.lat = Number(location.latitude);
  newFormat.lng = Number(location.longitude);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDFxASOKYs5Q8yYd4j0hVsabvOjrD5_aH4",
    libraries: ["places"],
  });

  const [localisation, setLocalisation] = useState<LatLngLiteral>(newFormat);

  const center = useMemo<LatLngLiteral>(() => localisation, [localisation]);

  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div style={{ width: "100%", height: "250px", marginBottom: "1rem" }}>
      <Card style={{ width: "100%", height: "100%" }}>
        <GoogleMap
          zoom={15}
          center={center}
          mapContainerClassName="map-container-singleEvent"
          options={options}
        >
          <MarkerF
            position={localisation}
            icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
          />
        </GoogleMap>
      </Card>
    </div>
  );
};
