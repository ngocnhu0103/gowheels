// import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../components/Card";

import "swiper/css";

function BikePage() {
    let timer = useRef(null);
    // let [searchParams, setSearchParams] = useSearchParams();

    return (
        <main className="container w-4/5 mx-auto relative">
            <div className="fixed left-0 right-0 top-0 bg-white shadow-xl">
                <div className="container w-4/5 mx-auto ">
                    <Header />
                </div>

                <div className="h-44 flex flex-col justify-center ">
                    <div className="flex items-center justify-center gap-20">
                        <div>
                            <PlaceOutlinedIcon />
                            <span className="ml-4">Ho Chi Minh</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarMonthIcon />
                            <div className="flex items-center gap-5">
                                <div className="flex items-center gap-2">
                                    <span>31/08/2023</span>
                                    <p className="h-[15px] w-[1px] bg-gray-600"></p>
                                    <span>21:00</span>
                                </div>
                                <ArrowCircleRightOutlinedIcon />
                                <div className="flex items-center gap-2">
                                    <span>31/08/2023</span>
                                    <p className="h-[15px] w-[1px] bg-gray-600"></p>
                                    <span>21:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-5 mt-5">
                        <div className="w-1/10">
                            <p className="w-8 h-8 flex items-center justify-center border border-gray-600 text-gray-600 rounded-full">
                                <RestartAltOutlinedIcon />
                            </p>
                        </div>
                        <div className="w-4/5">
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={5}
                                navigation
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log("slide change")}
                            >
                                <SwiperSlide>
                                    <div className="p-2 border flex items-center gap-2 border-gray-600 rounded-3xl text-gray-600 ">
                                        <RestartAltOutlinedIcon />
                                        <span>Tiet kiem xang</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="p-2 border flex items-center gap-2 border-gray-600 rounded-3xl text-gray-600 ">
                                        <RestartAltOutlinedIcon />
                                        <span>Tiet kiem xang</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="p-2 border flex items-center gap-2 border-gray-600 rounded-3xl text-gray-600 ">
                                        <RestartAltOutlinedIcon />
                                        <span>Tiet kiem xang</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="p-2 border flex items-center gap-2 border-gray-600 rounded-3xl text-gray-600 ">
                                        <RestartAltOutlinedIcon />
                                        <span>Tiet kiem xang</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="p-2 border flex items-center gap-2 border-gray-600 rounded-3xl text-gray-600 ">
                                        <RestartAltOutlinedIcon />
                                        <span>Tiet kiem xang</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="p-2 border flex items-center gap-2 border-gray-600 rounded-3xl text-gray-600 ">
                                        <RestartAltOutlinedIcon />
                                        <span>Tiet kiem xang</span>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>

                        <div className=" w-1/10">
                            <FilterAltOutlinedIcon />
                            <span>Bo loc</span>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="grid grid-cols-4 gap-5 mt-10">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </ul>
            <Footer />
        </main>
    );
}

export default BikePage;
