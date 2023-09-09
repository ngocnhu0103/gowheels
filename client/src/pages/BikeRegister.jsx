import React, { useState } from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BikeInfo from "../components/form/BikeInfo";
import { useDispatch } from "react-redux";
import { saveInfoBike, saveInfoRental } from "../store/bikeRegisterSlice";
import InfoRental from "../components/form/InfoRental";
function BikeRegister() {
    const [slideNum, setSlideNum] = useState(1);
    const [selectedTags, setSelectedTags] = useState([]);
    const dispatch = useDispatch();
    const categories = [
        {
            value: 1,
            label: "Xe máy",
        },
        {
            value: 2,
            label: "Xe ô tô",
        },
        {
            value: 3,
            label: "Xe đạp",
        },
    ];
    const formikInfoBike = useFormik({
        initialValues: {
            bikeName: "",
            bikeCode: "",
            category: 1,
            description: "",
            color: "",
        },
        validationSchema: Yup.object({
            bikeCode: Yup.string().required("Biển số xe bắt buộc"),
            bikeName: Yup.string().required("Tên xe là bặt buộc"),
            category: Yup.number()
                .required()
                .oneOf([1, 2, 3], "Danh mục phải là một trong các giá trị sau: [Xe máy,Xe ô tô,Xe đạp]"),
        }),
        onSubmit: (values) => {
            dispatch(saveInfoBike(values));
            setSlideNum(slideNum + 1);
        },
    });

    const formikInfoRental = useFormik({
        initialValues: {
            price: null,
            place: "",
        },
        validationSchema: Yup.object({
            price: Yup.number().required("Giá thuê xe bắt buộc"),
            place: Yup.string().required("Địa chỉ xe bắt buộc"),
        }),
        onSubmit: (values) => {
            dispatch(saveInfoRental(values));
            setSlideNum(slideNum + 1);
        },
    });

    const submitForm = (e) => {
        console.log(formikInfoBike.values);
        if (slideNum === 1) {
            selectedTags.length > 0 && (formikInfoBike.values.tags = selectedTags);
            formikInfoBike.handleSubmit(e);
        } else if (slideNum === 2) {
            // sumbit 2
            formikInfoRental.handleSubmit(e);
        } else {
            // post
        }
    };
    const render = () => {
        if (slideNum === 1) {
            return (
                <BikeInfo
                    formik={formikInfoBike}
                    categories={categories}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
            );
        } else if (slideNum === 2) {
            return <InfoRental formik={formikInfoRental} />;
        } else {
            return null;
        }
    };
    return (
        <main className="container w-4/5 mx-auto">
            <Header />

            <section className="mt-20">
                <div className="flex items-center justify-center relative">
                    <Link to={-1} className="flex items-center absolute left-0">
                        <ArrowBackIosIcon />
                        <span className="">Quay lại</span>
                    </Link>
                    <h1 className="font-bold text-3xl">Đăng ký xe</h1>
                </div>
                <div className="w-3/4 mx-auto">
                    <div className="h-36 flex items-center justify-center flex-col mt-5 bg-white shadow-xl">
                        <div className="flex justify-center gap-12">
                            <div>
                                <p
                                    className={`w-16 h-16 flex items-center  justify-center font-semibold text-white rounded-full  
                                ${slideNum === 1 ? "bg-primary/90 text-white" : "bg-primary/5 text-black"}`}
                                >
                                    1
                                </p>
                                <p className="text-gray-400 font-medium mt-2">Thông tin</p>
                            </div>
                            <KeyboardArrowRightIcon fontSize="large" color="disabled" className="mt-4" />
                            <div>
                                <p
                                    className={`w-16 h-16 flex items-center font-semibold justify-center   rounded-full  
                            ${slideNum === 2 ? "bg-primary/90 text-white" : "bg-primary/5 text-black"}`}
                                >
                                    2
                                </p>
                                <p className="text-gray-400 font-medium mt-2">Cho thuê</p>
                            </div>
                            <KeyboardArrowRightIcon fontSize="large" color="disabled" className="mt-4" />
                            <div>
                                <p
                                    className={`w-16 h-16 flex items-center font-semibold justify-center   rounded-full  
                            ${slideNum === 3 ? "bg-primary/90 text-white" : "bg-primary/5 text-black"}`}
                                >
                                    3
                                </p>
                                <p className="text-gray-400 font-medium mt-2">Hình ảnh</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 p-5 bg-white shadow-xl ">{render()}</div>
                    <div className="flex items-center justify-between gap-5 my-5">
                        <Button
                            variant="outlined"
                            className="w-1/2"
                            size="large"
                            disabled={slideNum === 1}
                            onClick={() => {
                                setSlideNum(slideNum - 1);
                            }}
                        >
                            Quay lại
                        </Button>
                        <Button variant="contained" className="w-1/2" size="large" onClick={submitForm}>
                            Kế tiếp
                        </Button>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default BikeRegister;
