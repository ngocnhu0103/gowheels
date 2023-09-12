import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
function LocationPin({ text }) {
    return (
        <div className="pin">
            <PlaceIcon />
            <p className="pin-text">{text}</p>
        </div>
    );
}

export default LocationPin;
