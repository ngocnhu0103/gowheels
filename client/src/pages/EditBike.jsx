import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editBikeAPI, getBikeAPI } from "../api/bikeAPI";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { useFormik } from "formik";
import { Button, CircularProgress, MenuItem, Slider, TextField } from "@mui/material";
import * as Yup from "yup";
import { getTagsAPI } from "../api/tagAPI";
import { getCategoriesAPI } from "../api/categoryAPI";
import Tag from "../components/Tag";
import CloseIcon from "@mui/icons-material/Close";
import UploadBikeImg from "../components/form/UploadBikeImg";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import Map from "../components/Map";
import { getCityByLatLongAPI } from "../api/placeAPI";
const EditBike = () => {
    const { bikeId } = useParams();
    const dispatch = useDispatch();
    const { bike } = useSelector((state) => state.bike);
    const { tags } = useSelector((state) => state.tag);
    const { categories } = useSelector((state) => state.category);
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [places, setPlaces] = useState(null);
    const [loading, setLoading] = useState(false);
    const timer = useRef(null);

    const provider = new OpenStreetMapProvider({
        params: {
            countrycodes: "vn",
            "accept-language": "vi",
            addressdetails: 1,
        },
    });

    const [location, setLocation] = useState({
        address: "Ho Chi Minh City, Vietnam",
        lat: 10.762622,
        lng: 106.660172,
    });

    const searchPlaces = async (value) => {
        const results = await provider.search({ query: value });
        setPlaces(results);
    };
    const handleChangePlace = (e) => {
        const value = e.target.value;
        handleChange(e);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            searchPlaces(value);
        }, 1000);
    };
    const selectedPlace = async (place) => {
        const [lat, lon] = place.bounds[0];
        const res = await getCityByLatLongAPI({ lat, lon });
        console.log(res.address, "place");
        setFieldValue("place", place.label.split("/").join(""));
        setFieldValue("city", res.address.city || res.address.state);
        setFieldValue("lat", lat);
        setFieldValue("lng", lon);
        setLocation({ address: place.label.split("/").join(""), lat: lat, lng: lon });
        setPlaces(null);
    };
    const navigate = useNavigate();
    const { handleBlur, handleChange, setValues, values, handleSubmit, touched, errors, setFieldValue } = useFormik({
        initialValues: {
            price: 0,
            place: "",
            city: "",
            lat: 0,
            lng: 0,
            weekDiscount: 0,
            monthDiscount: 0,
            bikeName: "",
            bikeCode: "",
            categoryId: 1,
            description: "",
            color: "",
        },
        validationSchema: Yup.object({
            price: Yup.number().required("Giá thuê xe bắt buộc"),
            place: Yup.string().required("Địa chỉ xe bắt buộc"),
            bikeCode: Yup.string().required("Biển số xe bắt buộc"),
            bikeName: Yup.string().required("Tên xe là bặt buộc"),
            description: Yup.string().max(500, "Mô tả không quá 500 kí tự"),
            categoryId: Yup.number()
                .required()
                .oneOf([1, 2, 3], "Danh mục phải là một trong các giá trị sau: [Xe máy,Xe ô tô,Xe đạp]"),
        }),
        onSubmit: (values) => {
            setLoading(true);
            console.log(values, selectedTags, images, newImages);
            const data = {
                ...values,
                tagList: selectedTags,
                imageList: images,
                newImages,
            };
            console.log(data);
            editBike(data);
        },
    });
    const editBike = async (values) => {
        await editBikeAPI(dispatch, values, bikeId);
        setLoading(false);
        navigate(`/bike/${bikeId}`);
    };
    const selectTag = (id) => {
        const check = selectedTags.some((tagId) => id === tagId);
        check ? setSelectedTags(selectedTags.filter((tagId) => tagId !== id)) : setSelectedTags([...selectedTags, id]);
    };
    const activedTag = (id) => {
        return selectedTags?.some((tagId) => tagId === id);
    };
    const handleRemove = (id) => {
        const imageTemps = images.filter((i) => i.imgId !== id);
        setImages(imageTemps);
    };

    useEffect(() => {
        const fetchBikeById = async (id) => {
            await getBikeAPI(dispatch, id);
        };
        fetchBikeById(bikeId);
        console.log(bike);
    }, [bikeId]);
    useEffect(() => {
        if (bike) {
            setValues({
                bikeCode: bike.bikeCode,
                bikeName: bike.bikeName,
                categoryId: bike.category?.categoryId,
                city: bike.city,
                color: bike.color,
                description: bike.description,
                place: bike.place,
                price: bike.price,
                monthDiscount: bike.monthDiscount,
                weekDiscount: bike.weekDiscount,
                lat: bike.lat,
                lng: bike.lng,
            });
            setSelectedTags(bike.tagList?.map((b) => b.tagId));
            setImages(bike.images);
            if (bike.lat && bike.lng) {
                setLocation({
                    address: bike.place,
                    lat: bike.lat,
                    lng: bike.lng,
                });
            }
        }
    }, [bike]);
    useEffect(() => {
        const fetchTags = async () => {
            await getTagsAPI(dispatch);
        };
        const fetchCategories = async () => {
            await getCategoriesAPI(dispatch);
        };
        fetchTags();
        fetchCategories();
    }, []);

    return (
        <main className="container mx-auto w-4/5 max-md:w-full max-md:px-4">
            <Header />
            <h1 className="text-center mt-5 font-semibold text-2xl">Cập nhật thông tin xe</h1>
            <form className="w-full mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="w-full flex gap-4">
                    <div className="w-1/4">
                        <div className="w-full">
                            <label className="block" htmlFor="price">
                                Tên xe
                            </label>
                            <TextField
                                id="bikeName"
                                className="w-full"
                                size="small"
                                value={values.bikeName}
                                variant="outlined"
                                name="bikeName"
                                margin="normal"
                                disabled
                            ></TextField>
                        </div>
                        <div className="w-full">
                            <label className="block" htmlFor="price">
                                Thể loại xe
                            </label>
                            <TextField
                                id="categoryId"
                                select
                                className="w-full"
                                size="small"
                                label="Chọn loại xe"
                                value={values.categoryId}
                                variant="outlined"
                                name="categoryId"
                                margin="normal"
                                onChange={handleChange}
                                disabled
                            >
                                {categories &&
                                    categories.map((option) => (
                                        <MenuItem key={option.categoryId} value={option.categoryId}>
                                            {option.categoryName}
                                        </MenuItem>
                                    ))}
                            </TextField>
                            {touched.categoryId && errors.categoryId ? (
                                <p className="text-rose-400 text-xs font-semibold">{errors.categoryId}</p>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <label className="block" htmlFor="price">
                                Đơn giá
                            </label>
                            <p className="text-sm text-gray-400">Đơn giá áp dụng cho tất cả các ngày</p>
                            <div className="flex items-center gap-4">
                                <TextField
                                    value={values.price}
                                    onChange={handleChange}
                                    id="price"
                                    size="small"
                                    name="price"
                                    className="w-full"
                                    variant="outlined"
                                    margin="normal"
                                />
                            </div>
                            {touched.price && errors.price ? (
                                <p className="text-rose-400 text-xs font-semibold">{errors.price}</p>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <label className="block" htmlFor="price">
                                Màu sắc
                            </label>
                            <p className="text-sm text-gray-400">Màu sắc mô tả giúp xe có thể được tìm dễ hơn</p>
                            <div className="flex items-center gap-4">
                                <TextField
                                    value={values.color}
                                    onChange={handleChange}
                                    id="color"
                                    size="small"
                                    name="color"
                                    className="w-full"
                                    variant="outlined"
                                    margin="normal"
                                />
                            </div>
                            {touched.color && errors.color ? (
                                <p className="text-rose-400 text-xs font-semibold">{errors.color}</p>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <p>Giảm giá theo tuần (% trên đơn giá)</p>
                            <Slider
                                name="weekDiscount"
                                aria-label="Temperature"
                                min={0}
                                max={100}
                                size="medium"
                                marks={false}
                                value={values.weekDiscount}
                                color="primary"
                                onChange={handleChange}
                            />
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-400">Giá giảm đề xuất: 10%</p>
                                <span className="text-right">{values.weekDiscount}%</span>
                            </div>
                        </div>

                        <div className="w-full">
                            <p>Giảm giá theo tháng (% trên đơn giá)</p>

                            <Slider
                                name="monthDiscount"
                                aria-label="Temperature"
                                min={0}
                                max={100}
                                value={values.monthDiscount}
                                size="medium"
                                marks={false}
                                color="primary"
                                onChange={handleChange}
                            />
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-400">Giá giảm đề xuất: 20%</p>
                                <span className="text-right">{values.monthDiscount}%</span>
                            </div>
                        </div>
                        <div className="w-full">
                            <label className="block" htmlFor="price">
                                Mô tả
                            </label>
                            <p className="text-sm text-gray-400">Mô tả chi tiết cho chiếc xe</p>
                            <div className="flex items-center gap-4">
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
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {touched.price && errors.price ? (
                                <p className="text-rose-400 text-xs font-semibold">{errors.price}</p>
                            ) : null}
                        </div>
                    </div>
                    <div className="w-3/4">
                        <div className="w-full">
                            <label className="block">Tiện ích</label>
                            <ul className="grid grid-cols-4 gap-4 mt-4">
                                {tags.length > 0
                                    ? tags.map((tag) => (
                                          <Tag
                                              tag={tag}
                                              key={tag.tagId}
                                              selectTag={selectTag}
                                              activeTag={activedTag(tag.tagId)}
                                          />
                                      ))
                                    : ""}
                            </ul>
                        </div>
                        <div>
                            <div>
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Image */}
                <div className="w-full py-8">
                    <UploadBikeImg imgs={newImages} setImgs={setNewImages} />

                    <h3 className="my-2 text-lg text-yellow-600">Ảnh hiện tại</h3>
                    <div className="w-full grid grid-cols-4 gap-5 ">
                        {images &&
                            images.map((image) => {
                                return (
                                    <div key={image.imgId} className="rounded-md shadow-md bg-white relative h-fit">
                                        <img
                                            src={image.url}
                                            alt={image.imgId}
                                            className="rounded-md max-h-48 w-full object-cover"
                                        />
                                        <p
                                            onClick={() => {
                                                handleRemove(image.imgId);
                                            }}
                                            className="cursor-pointer duration-300 hover:bg-gray-500 absolute -top-4 -right-4 p-1 rounded-full bg-gray-400 flex items-center justify-center"
                                        >
                                            <CloseIcon className="text-gray-200" />
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                {/* Map */}
                <div className="w-full py-4">
                    <div className="relative">
                        <p>Địa chỉ xe</p>
                        <div className="h-[60vh] mt-5 z-10 overflow-hidden">
                            {location && <Map location={location} zoomLevel={12} />}
                        </div>
                        <input
                            name="place"
                            value={values.place}
                            onChange={handleChangePlace}
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
                        {touched.place && errors.place ? (
                            <p className="text-rose-400 text-xs font-semibold mt-2">{errors.place}</p>
                        ) : null}
                    </div>
                </div>
                <div className="py-4 flex items-center justify-center gap-4">
                    <Link to={-1}>Quay về</Link>
                    <Button variant="contained" color="info" type="submit" disabled={loading}>
                        {loading ? <CircularProgress /> : "Cập nhật xe"}
                    </Button>
                </div>
            </form>
        </main>
    );
};

export default EditBike;
