/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import { divIcon } from "leaflet";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

const RenderIcon = (type) => {
    if (type === 1) {
        return <TwoWheelerIcon width={40} color="primary" className="fill-primary" />;
    } else if (type === 2) {
        return <DirectionsBikeIcon width={40} color="primary" className="fill-primary" />;
    } else {
        return <DirectionsCarIcon width={40} color="primary" className="fill-primary" />;
    }
};
function Map({ location = null, zoomLevel, bikes, currentLocation }) {
    const [showListBike, setShowListBike] = useState(false);
    const [selectIndex, setSelectIndex] = useState(0);

    console.log(bikes);
    console.log(currentLocation);

    if (location) {
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
    } else if (bikes) {
        return (
            <MapContainer
                key={[currentLocation[0], currentLocation[1]]}
                center={[currentLocation[0], currentLocation[1]]}
                zoom={zoomLevel}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[currentLocation[0], currentLocation[1]]}>
                    <Popup>My location</Popup>
                </Marker>
                {bikes &&
                    bikes.length > 0 &&
                    bikes.map((bike, index) => {
                        return (
                            <Marker
                                eventHandlers={{
                                    click: () => {
                                        setShowListBike(true);
                                        setSelectIndex(index);
                                    },
                                }}
                                key={index}
                                position={[bike.lat, bike.lng]}
                                icon={divIcon({
                                    html: renderToStaticMarkup(RenderIcon(bike.category?.categoryId)),
                                })}
                            ></Marker>
                        );
                    })}

                {showListBike && (
                    <div className="z-[99999] absolute bottom-0  left-0  w-full p-4 max-w-[1440px] bg-gray-100">
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={3}
                            tabIndex={selectIndex}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log("slide change")}
                        >
                            {bikes &&
                                bikes.length > 0 &&
                                bikes.map((item) => {
                                    return (
                                        <SwiperSlide key={item.bikeId}>
                                            <div className="flex gap-2 p-4 bg-gray-200 shadow-lg h-[140px]">
                                                <img src={item.images[0]?.url} alt="" width={140} height={120} />
                                                <div>
                                                    <Link to={`/bike/${item.bikeId}`}>
                                                        <h3 className="text-xl font-bold text-black">
                                                            {item.bikeName}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-lg text-green-500">{item.price}K</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                        </Swiper>
                    </div>
                )}
            </MapContainer>
        );
    }
}

export default Map;
