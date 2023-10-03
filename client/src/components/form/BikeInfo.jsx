import { MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import Tag from "../Tag";
import { useDispatch, useSelector } from "react-redux";
import { getTagsAPI } from "../../api/tagAPI";
import { getCategoriesAPI } from "../../api/categoryAPI";
function BikeInfo({ formik, selectedTags, setSelectedTags }) {
    const { tags } = useSelector((state) => state.tag);
    const { categories } = useSelector((state) => state.category);
    const dispatch = useDispatch();

    const selectTag = (id) => {
        const check = selectedTags.some((tagId) => id === tagId);
        check ? setSelectedTags(selectedTags.filter((tagId) => tagId !== id)) : setSelectedTags([...selectedTags, id]);
    };
    const activedTag = (id) => {
        return selectedTags.some((tagId) => tagId === id);
    };
    useEffect(() => {
        const fetchTags = async () => {
            await getTagsAPI(dispatch);
        };
        const fetchCategories = async () => {
            await getCategoriesAPI(dispatch);
        };
        tags || fetchTags();
        categories || fetchCategories();
    }, []);
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
                    id="categoryId"
                    select
                    className="w-1/2"
                    size="small"
                    label="Chọn loại xe"
                    value={formik.values.categoryId}
                    variant="outlined"
                    name="categoryId"
                    margin="normal"
                    onChange={formik.handleChange}
                >
                    {categories.map((option) => (
                        <MenuItem key={option.categoryId} value={option.categoryId}>
                            {option.categoryName}
                        </MenuItem>
                    ))}
                </TextField>
                {formik.touched.categoryId && formik.errors.categoryId ? (
                    <p className="text-rose-400 text-xs font-semibold">{formik.errors.categoryId}</p>
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
                              <Tag tag={tag} key={tag.tagId} selectTag={selectTag} activeTag={activedTag(tag.tagId)} />
                          ))
                        : ""}
                </ul>
            </div>
        </form>
    );
}

export default BikeInfo;
