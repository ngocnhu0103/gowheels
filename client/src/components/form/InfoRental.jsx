import { Slider, TextField } from "@mui/material";
import React from "react";

function InfoRental({ formik }) {
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
                            name="sale7"
                            aria-label="Temperature"
                            min={0}
                            max={100}
                            size="medium"
                            marks={false}
                            color="primary"
                            onChange={formik.handleChange}
                        />
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-400">Giá giảm đề xuất: 10%</p>
                            <span className="text-right">{formik.values.sale7}%</span>
                        </div>
                    </div>

                    <div className="w-1/2">
                        <p>Giảm giá theo tháng (% trên đơn giá)</p>

                        <Slider
                            name="sale30"
                            aria-label="Temperature"
                            min={0}
                            max={100}
                            size="medium"
                            marks={false}
                            color="primary"
                            onChange={formik.handleChange}
                        />
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-400">Giá giảm đề xuất: 20%</p>
                            <span className="text-right">{formik.values.sale30}%</span>
                        </div>
                    </div>
                </div>
                {formik.touched.place && formik.errors.place ? (
                    <p className="text-rose-400 text-xs font-semibold">{formik.errors.place}</p>
                ) : null}
            </div>
        </form>
    );
}

export default InfoRental;
