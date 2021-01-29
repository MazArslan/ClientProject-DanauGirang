/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";
import { Link, MemoryRouter } from "react-router-dom";
import axios from "axios";
import LogRocket from "logrocket";
import L from "leaflet";

// icon for map marker
const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

// coordinates states
const Map = () => {
  const [coords, setCoords] = React.useState([]);

  // requesting coordinates from DB
  useEffect(() => {
    async function getCoords() {
      axios
        .get("http://localhost:3000/api/mapCoordinates/mapCoordinates")
        .then(res => {
          setCoords(res.data);
        })
        .catch(error => LogRocket.captureException(error));
    }
    getCoords();
  }, [setCoords]);

  return (
    <div style={{ margin: 100 }}>
      <h1>Camera Map Overview</h1>
      <LeafletMap
        center={[4.2105, 101.8758]}
        zoom={1.7}
        maxZoom={10}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        style={{ height: "100vh" }}
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {Object.entries(coords).map(([key, value], index) => {
          const [lng, lat] = value.coordinates.split(",");
          return (
            <Marker
              key={index}
              position={[parseFloat(lng), parseFloat(lat)]}
              icon={icon}
              onClick={() => {
                setActiveCamera(value);
              }}
            >
              <Popup>
                <MemoryRouter initialEntries={["/"]}>
                  <Link to="/adminArea" target="_blank">
                    View all projects
                  </Link>
                </MemoryRouter>
              </Popup>
            </Marker>
          );
        })}
      </LeafletMap>
    </div>
  );
};

export default Map;
