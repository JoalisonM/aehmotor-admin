import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

interface LeafletRoutingMachineProps {
  origin: {
    lat: number,
    lng: number;
  };
  destination: {
    lat: number,
    lng: number;
  };
}

export const LeafletRoutingMachine = (props: LeafletRoutingMachineProps) => {
  const { origin, destination } = props;
  const map = useMap();

  useEffect(() => {
    L.Routing.control({
      show: false,
      waypoints: [
        L.latLng(origin.lat, origin.lng),
        L.latLng(destination.lat, destination.lng)
      ],
    }).addTo(map);
  }, []);

  return (
    <div>index</div>
  );
};