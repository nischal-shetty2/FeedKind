import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import HomePage from "./Pages/Home";

function LocationSelector({
  setLocation,
}: {
  setLocation: (coords: { lat: number; lng: number }) => void;
}) {
  useMapEvents({
    click(e: any) {
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return null;
}

function App() {
  const [location, setLocation] = useState({
    lat: 12.9209234,
    lng: 74.8196071,
  });

  return (
    <div>
      <HomePage />
      {/* <h1>FoodKind</h1>
      <div>
        <p>
          Selected Location: Latitude {location.lat}, Longitude {location.lng}
        </p>
      </div>
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={13}
        style={{ height: "450px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[location.lat, location.lng]} />
        <LocationSelector setLocation={setLocation} />
      </MapContainer> */}
    </div>
  );
}

export default App;
