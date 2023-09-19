import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";

function Map({ location, zoomLevel }) {
    const [places, setPlaces] = useState([]);

    return (
        <div className="h-full w-full">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyAlyDT1yy-Uvp--G9NT1HEE9s0fxpbcR-U" }}
                defaultCenter={location}
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