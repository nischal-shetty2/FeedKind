import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default marker icons
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LocationSelector({
  setLocation,
}: {
  setLocation: (coords: { lat: number; lng: number }) => void;
}) {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return null;
}

function Map({ location, setLocation }: any) {
  return (
    <div>
      <MapContainer
        className=" min-w-[500px]"
        center={[location.lat, location.lng] as LatLngExpression}
        zoom={13}
        style={{ height: "450px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[location.lat, location.lng]} />
        <LocationSelector setLocation={setLocation} />
      </MapContainer>
    </div>
  );
}

export default Map;
