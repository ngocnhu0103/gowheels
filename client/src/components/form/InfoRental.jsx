import { TextField } from "@mui/material";
import React from "react";

function InfoRental({ formik }) {
    return (
        <form className="">
            <div>
                <label className="block" htmlFor="price">
                    Tên xe
                </label>
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
                    Biển số xe
                </label>
                <TextField
                    value={formik.values.place}
                    onChange={formik.handleChange}
                    id="place"
                    size="small"
                    className="w-1/2"
                    name="place"
                    variant="outlined"
                    margin="normal"
                />
                {formik.touched.place && formik.errors.place ? (
                    <p className="text-rose-400 text-xs font-semibold">{formik.errors.place}</p>
                ) : null}
            </div>
        </form>
    );
}

export default InfoRental;
