/* eslint-disable react/prop-types */
import { Slider, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Map from "../Map";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";

function InfoRental({ formik }) {
    const bikeRegister = useSelector((state) => state.bikeRegister);
    const [placeInput, setPlaceInput] = useState("");
    const [places, setPlaces] = useState(null);
    const timer = useRef(null);
    const [location, setLocation] = useState({
        address: "Ho Chi Minh City, Vietnam",
        lat: 10.762622,
        lng: 106.660172,
    });
    const provider = new OpenStreetMapProvider({
        params: {
            countrycodes: "vn",
            "accept-language": "vi",
            addressdetails: 1,
        },
    });
    const searchPlaces = async (value) => {
        const results = await provider.search({ query: value });
        setPlaces(results);
    };
    const handleChange = (e) => {
        const value = e.target.value;
        setPlaceInput(e.target.value);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            searchPlaces(value);
        }, 1000);
    };
    const selectedPlace = (place) => {
        const [lat, lon] = place.bounds[0];
        formik.setFieldValue("place", place.label.split("/").join(""));
        formik.setFieldValue("lat", lat);
        formik.setFieldValue("lng", lon);
        setLocation({ address: place.label.split("/").join(""), lat: lat, lng: lon });
        setPlaceInput(place.label.split("/").join(""));
        setPlaces(null);
    };
    useEffect(() => {
        bikeRegister.place && setPlaceInput(bikeRegister.place);
    }, [bikeRegister]);

    return (
        <form className="">
            <div>
                <label className="block" htmlFor="price">
                    Đơn giá
                </label>
                <p className="text-sm text-gray-400">Đơn giá áp dụng cho tất cả các ngày</p>
                <div className="flex items-center gap-4">
                    <TextField
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        id="price"
                        size="small"
                        name="price"
                        className="w-1/2"
                        variant="outlined"
                        margin="normal"
                    />
                    <span className="text-2xl font-bold">K</span>
                </div>
                {formik.touched.price && formik.errors.price ? (
                    <p className="text-rose-400 text-xs font-semibold">{formik.errors.price}</p>
                ) : null}
            </div>

            <div>
                <label className="block" htmlFor="place">
                    Giảm giá
                </label>
                <div className="flex gap-5 mt-5">
                    <div className="w-1/2">
                        <p>Giảm giá theo tuần (% trên đơn giá)</p>
                        <Slider
                            name="weekDiscount"
                            aria-label="Temperature"
                            min={0}
                            max={100}
                            size="medium"
                            marks={false}
                            value={formik.values.weekDiscount}
                            color="primary"
                            onChange={formik.handleChange}
                        />
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-400">Giá giảm đề xuất: 10%</p>
                            <span className="text-right">{formik.values.weekDiscount}%</span>
                        </div>
                    </div>

                    <div className="w-1/2">
                        <p>Giảm giá theo tháng (% trên đơn giá)</p>

                        <Slider
                            name="monthDiscount"
                            aria-label="Temperature"
                            min={0}
                            max={100}
                            value={formik.values.monthDiscount}
                            size="medium"
                            marks={false}
                            color="primary"
                            onChange={formik.handleChange}
                        />
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-400">Giá giảm đề xuất: 20%</p>
                            <span className="text-right">{formik.values.monthDiscount}%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="relative">
                    <p>Địa chỉ xe</p>
                    <div className="h-[60vh] mt-5 z-10 overflow-hidden">
                        <Map location={location} zoomLevel={12} />
                    </div>
                    <input
                        name="place"
                        value={placeInput}
                        onChange={handleChange}
                        type="text"
                        placeholder="Search place"
                        autoComplete="off"
                        className="w-2/3 py-2 px-3 outline-none rounded-xl border border-gray-200 mt-5 "
                    />
                    <ul
                        className={`w-2/3 bg-white p-2 z-50 rounded-xl absolute top-full left-0 
                ${places && places.length > 0 ? "" : "hidden"}`}
                    >
                        {places && places.length > 0
                            ? places.map((place, index) => {
                                  return (
                                      <li
                                          className="p-2 bg-gray-400 border-b cursor-pointer"
                                          onClick={() => {
                                              selectedPlace(place);
                                          }}
                                          key={index}
                                      >
                                          {place.label.split("/").join("")}
                                      </li>
                                  );
                              })
                            : null}
                    </ul>
                    {formik.touched.place && formik.errors.place ? (
                        <p className="text-rose-400 text-xs font-semibold mt-2">{formik.errors.place}</p>
                    ) : null}
                </div>
            </div>
        </form>
    );
}

export default InfoRental;
