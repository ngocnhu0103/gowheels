import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
function LocationPin({ text }) {
    return (
        <div className="text-primary">
            <PlaceIcon fontSize="large" />
            <p className="">{text}</p>
        </div>
    );
}

export default LocationPin;
