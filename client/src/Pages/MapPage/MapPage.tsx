import { Box, Grid, Typography } from "@mui/material";
import { useLoadScript } from "@react-google-maps/api";
import { FunctionComponent } from "react";
import Map from "../../Components/Common/Map/index";
import { dataList } from "../../Constants/Index";

interface MapPageProps {
  // dataList: any[];
}

export const MapPage: FunctionComponent<MapPageProps> = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDFxASOKYs5Q8yYd4j0hVsabvOjrD5_aH4",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map markerData={dataList} />;
};
