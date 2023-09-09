import { MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";

import Tag from "../Tag";
function BikeInfo({ formik, categories, selectedTags, setSelectedTags }) {
    const tags = [
        {
            id: 1,
            tagName: "Tiết kiếm xăng",
        },
        {
            id: 2,
            tagName: "Tiết kiếm điện",
        },
        {
            id: 3,
            tagName: "Bản đồ",
        },
        {
            id: 4,
            tagName: "ETC",
        },
    ];

    const selectTag = (tag) => {
        const check = selectedTags.some((t) => tag.id === t.id);
        check
            ? setSelectedTags(selectedTags.filter((curTag) => curTag.id !== tag.id))
            : setSelectedTags([...selectedTags, tag]);
    };
    const activedTag = (t) => {
        return selectedTags.some((tag) => tag.id === t.id);
    };

    return (
        <form className="">
            <div>
                <label className="block" htmlFor="bikeName">
                    Tên xe
                </label>
                <TextField
                    value={formik.values.bikeName}
                    onChange={formik.handleChange}
                    id="bikeName"
                    size="small"
                    name="bikeName"
                    className="w-1/2"
                    variant="outlined"
                    margin="normal"
                />
                {formik.touched.bikeName && formik.errors.bikeName ? (
                    <p className="text-rose-400 text-xs font-semibold">{formik.errors.bikeName}</p>
                ) : null}
            </div>

            <div>
                <label className="block" htmlFor="bikeCode">
                    Biển số xe
                </label>
                <TextField
                    value={formik.values.bikeCode}
                    onChange={formik.handleChange}
                    id="bikeCode"
                    size="small"
                    className="w-1/2"
                    name="bikeCode"
                    variant="outlined"
                    margin="normal"
                />
                {formik.touched.bikeCode && formik.errors.bikeCode ? (
                    <p className="text-rose-400 text-xs font-semibold">{formik.errors.bikeCode}</p>
                ) : null}
            </div>
            <div>
                <TextField
                    id="category"
                    select
                    className="w-1/2"
                    size="small"
                    label="Chọn loại xe"
                    value={formik.values.category}
                    variant="outlined"
                    name="category"
                    margin="normal"
                    onChange={formik.handleChange}
                >
                    {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                {formik.touched.category && formik.errors.category ? (
                    <p className="text-rose-400 text-xs font-semibold">{formik.errors.category}</p>
                ) : null}
            </div>
            <div>
                <label className="block" htmlFor="description">
                    Mô tả
                </label>
                <TextField
                    id="description"
                    size="small"
                    name="description"
                    variant="outlined"
                    margin="normal"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                />
            </div>
            <div>
                <label className="block" htmlFor="color">
                    Màu sắc
                </label>
                <TextField
                    value={formik.values.color}
                    onChange={formik.handleChange}
                    id="color"
                    size="small"
                    name="color"
                    variant="outlined"
                    margin="normal"
                />
            </div>
            <div>
                <label className="block">Tiện ích</label>
                <ul className="grid grid-cols-4 gap-4 mt-4">
                    {tags.length > 0
                        ? tags.map((tag) => (
                              <Tag tag={tag} key={tag.id} selectTag={selectTag} activeTag={activedTag(tag)} />
                          ))
                        : ""}
                </ul>
            </div>
        </form>
    );
}

export default BikeInfo;
