import { Box, Grid, Typography } from "@mui/material";
import { useLoadScript } from "@react-google-maps/api";
import { FunctionComponent, MutableRefObject, ReactNode, Ref } from "react";
import Map from "../../Components/Common/Map/index";
import { dataList } from "../../Constants/Index";

interface MapPageProps {
  inputEl: any;
  setSelected: (s: string) => void;
}

export const MapPage: FunctionComponent<MapPageProps> = (props) => {
  let { setSelected, inputEl } = props;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDFxASOKYs5Q8yYd4j0hVsabvOjrD5_aH4",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Map setSelected={setSelected} inputEl={inputEl} markerData={dataList} />
  );
};
