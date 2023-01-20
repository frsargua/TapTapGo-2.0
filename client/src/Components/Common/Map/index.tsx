import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  FC,
  ReactNode,
  MutableRefObject,
} from "react";
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
} from "@react-google-maps/api";
import Distance from "../Distance/index";
import { useParams } from "react-router-dom";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

interface SearchProps {
  markerData: any[];
  setSelected: (s: string) => void;
  inputEl: MutableRefObject<ReactNode>;
}
export default function Map(props: SearchProps) {
  let { markerData, inputEl, setSelected } = props;
  const { cityName } = useParams<string>();
  const [localisation, setLocalisation] = useState<LatLngLiteral>({
    lat: 51.509865,
    lng: -0.118092,
  });
  const [office, setOffice] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const mapRef = useRef<GoogleMap>();
  const { setValue, clearSuggestions } = usePlacesAutocomplete({
    debounce: 300,
  });

  const getLatLongFromString = async (
    val: string
  ): Promise<{ lat: string; lng: string }> => {
    setValue(val, false);
    clearSuggestions();
    const results = await getGeocode({ address: val });
    console.log(results);
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
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const fetchDirections = (house: LatLngLiteral) => {
    if (!office) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: office,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
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
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}

          {office && (
            <>
              <Marker
                position={office}
                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              />

              <MarkerClusterer>
                {(clusterer) =>
                  markerData.map((house) => (
                    <Marker
                      key={house._id}
                      position={house.coordinates}
                      clusterer={clusterer}
                      onClick={() => {
                        fetchDirections(house);
                        setSelected(house._id);
                        inputEl.current.focus();
                      }}
                    />
                  ))
                }
              </MarkerClusterer>

              <Circle center={office} radius={5000} options={closeOptions} />
            </>
          )}
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
