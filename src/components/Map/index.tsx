import { useEffect, useState } from "react";
import Leaflet from "leaflet";
import * as Dialog from "@radix-ui/react-dialog";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { Overlay, Content } from "./styles";
import { LeafletRoutingMachine } from "../LeafletRoutingMachine";
import { useCities } from "../../hooks/useCities";

const DefaultIcon = Leaflet.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;

interface CityPositionProps {
  lat: number;
  lng: number;
}

interface MapProps {
  originCity: string;
  destinationCity: string;
}

export const Map = (props: MapProps) => {
  const { originCity, destinationCity } = props;
  const { getCityByName } = useCities();
  const [originCityPosition, setOriginCityPosition] = useState<CityPositionProps>({} as CityPositionProps);
  const [destinationCityPosition, setDestinationCityPosition] = useState<CityPositionProps>({} as CityPositionProps);

  useEffect(() => {
    loaderCitiesPositions();
  }, []);

  const loaderCitiesPositions = async () => {
    const originCityResponse = await getCityByName(originCity);
    const destinationCityResponse = await getCityByName(destinationCity);

    originCityResponse && setOriginCityPosition({
      lat: originCityResponse.latitude,
      lng: originCityResponse.longitude,
    });
    destinationCityResponse && setDestinationCityPosition({
      lat: destinationCityResponse.latitude,
      lng: destinationCityResponse.longitude,
    });
  };

  console.log("destinationCityPosition: ", destinationCityPosition);

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <MapContainer
          zoom={5}
          zoomControl={true}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LeafletRoutingMachine
            origin={originCityPosition}
            destination={destinationCityPosition}
          />
        </MapContainer>
      </Content>
    </Dialog.Portal>
  );
};