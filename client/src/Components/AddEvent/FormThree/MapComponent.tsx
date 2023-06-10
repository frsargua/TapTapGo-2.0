import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

type MapProps = {
  selectedPlace: google.maps.GeocoderResult | null;
};

const Map: React.FC<MapProps> = ({ selectedPlace }) => {
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
  };

  const mapStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };

  return (
    <div style={containerStyle}>
      <GoogleMap
        mapContainerStyle={mapStyle}
        center={
          selectedPlace
            ? {
                lat: selectedPlace.geometry?.location.lat(),
                lng: selectedPlace.geometry?.location.lng(),
              }
            : { lat: 51.5074, lng: -0.1278 }
        }
        zoom={10}
      >
        {selectedPlace && (
          <Marker position={selectedPlace.geometry?.location} />
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
