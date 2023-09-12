import React from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";

function Map({ location, zoomLevel }) {
    return (
        <div className="h-full w-full">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCoNT6clb28hZc1NrdfLbL64Bcj463VLiM" }}
                defaultCenter={location}
                defaultZoom={zoomLevel}
                // yesIWantToUseGoogleMapApiInternals
            >
                <LocationPin lat={location.lat} lng={location.lng} text={location.address} />
            </GoogleMapReact>
        </div>
    );
}

export default Map;
