import { useLoadScript } from "@react-google-maps/api";
import { FunctionComponent, MutableRefObject, ReactNode, Ref } from "react";
import Map from "./Map";
const googleApiKey = import.meta.env.VITE_API_KEY;

interface MapPageProps {
  inputEl: any;
  setSelected: (s: string) => void;
  dataList: any[];
}

export const MapPage: FunctionComponent<MapPageProps> = (props) => {
  let { setSelected, inputEl, dataList } = props;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries: ["places"],
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Map setSelected={setSelected} inputEl={inputEl} markerData={dataList} />
  );
};
