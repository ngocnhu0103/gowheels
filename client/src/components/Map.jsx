import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";

function Map({ location, zoomLevel }) {
    const [places, setPlaces] = useState([]);
    return (
        <div className="h-full w-full">
            <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.VITE_API_GG_KEY }}
                defaultCenter={{
                    lat: 10.762622,
                    lng: 106.660172,
                }}
                defaultZoom={zoomLevel}
                onGoogleApiLoaded={({ map, maps }) => console.log(map, maps)}
                yesIWantToUseGoogleMapApiInternals
                center={location}
            >
                <LocationPin lat={location.lat} lng={location.lng} text={location.address} />
            </GoogleMapReact>
        </div>
    );
}

export default Map;
