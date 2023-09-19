import { Slider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import Map from "../Map";
function InfoRental({ formik }) {
    const [location, setLocation] = useState({
        address: "Ho Chi Minh City, Vietnam",
        lat: 10.762622,
        lng: 106.660172,
    });
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({ ...location, lat: position.latitude, lng: position.longitude });
            });
        }
    }, []);
    const { ref } = usePlacesWidget({
        apiKey: "AIzaSyAlyDT1yy-Uvp--G9NT1HEE9s0fxpbcR-U",
        language: "vi",
        onPlaceSelected: (place) => {
            setLocation({
                address: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            });
            console.log(location);
        },
        options: {
            componentRestrictions: { country: "vn" },
        },
    });
    return (
        <form className="">
            <div>
                <label className="block" htmlFor="price">
                    Đơn giá
                </label>
                <p className="text-sm text-gray-400">Đơn giá áp dụng cho tất cả các ngày</p>
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
                {/* {formik.touched.place && formik.errors.place ? (
                    <p className="text-rose-400 text-xs font-semibold">{formik.errors.place}</p>
                ) : null} */}
            </div>
            <div>
                <p>Địa chỉ xe</p>
                <input
                    ref={ref}
                    type="text"
                    placeholder="Search place"
                    className="w-2/3 py-2 px-3 outline-none rounded-xl border border-gray-200 mt-5"
                />

                <div className="w-2/3 h-[50vh] mt-5">
                    <Map location={location} zoomLevel={15} />
                </div>
            </div>
        </form>
    );
}

export default InfoRental;
