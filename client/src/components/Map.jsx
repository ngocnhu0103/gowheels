import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import "leaflet";
function Map({ location, zoomLevel }) {
    const [places, setPlaces] = useState([]);

    return (
        <MapContainer key={[location.lat, location.lng]} center={[location.lat, location.lng]} zoom={zoomLevel}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[location.lat, location.lng]}>
                <Popup>{location.address}</Popup>
            </Marker>
        </MapContainer>
    );
}

export default Map;
