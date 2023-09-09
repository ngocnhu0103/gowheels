import React from "react";
// import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
function Map() {
    const defaultProps = {
        center: {
            lat: 10.762622,
            lng: 106.660172,
        },
        zoom: 12,
    };
    return (
        <div className="h-screen w-full">
            {/* <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCoNT6clb28hZc1NrdfLbL64Bcj463VLiM", libraries: ["places"] }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent lat={10.762622} lng={106.660172} text="My Marker" />
            </GoogleMapReact> */}
        </div>
    );
}

export default Map;
