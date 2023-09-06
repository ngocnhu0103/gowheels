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
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Button, Modal } from "@mui/material";
import Map from "../components/Map";

import "swiper/css";

function BikePage() {
    const [place, setPlace] = useState("");
    const [hide, setHide] = useState(0);
    const [isMap, setIsMap] = useState(false);

    const openMap = () => {
        setIsMap(true);
    };
    const closeMap = () => {
        setIsMap(false);
    };
    // let [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setHide(window.scrollY);
        });

        return window.removeEventListener("scroll", () => {
            setHide(window.scrollY);
        });
    }, []);
    return (
        <main className="container w-4/5 mx-auto relative">
            <div className="fixed left-0 right-0 top-0 bg-white shadow-xl">
                <div
                    className={`container w-4/5 mx-auto duration-300    ${
                        hide > 0 ? "-translate-y-20 invisible h-0" : "translate-y-0 visible h-full"
                    }`}
                >
                    <Header />
                </div>

                <div className="h-36 flex flex-col justify-center">
                    <div className="flex items-center justify-center gap-20">
                        <div>
                            <PlaceOutlinedIcon />
                            <input
                                className="ml-4 p-2 outline-none bg-gray-100 rounded-xl text-gray-600"
                                value={place}
                                onChange={(e) => {
                                    setPlace(e.target.value);
                                }}
                            />
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
                            <p className="w-8 h-8 flex items-center justify-center border border-gray-600 text-gray-600 rounded-full cursor-pointer">
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
                                    <div className="p-2 border flex items-center gap-2 border-gray-600 rounded-3xl text-gray-600 cursor-pointer ">
                                        <RestartAltOutlinedIcon />
                                        <span>Tiet kiem xang</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="p-2 border flex items-center gap-2 border-gray-600 rounded-3xl text-gray-600 cursor-pointer ">
                                        <RestartAltOutlinedIcon />
                                        <span>Tiet kiem xang</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="p-2 border flex items-center gap-2 border-gray-600 rounded-3xl text-gray-600 cursor-pointer ">
                                        <RestartAltOutlinedIcon />
                                        <span>Tiet kiem xang</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="p-2 border flex items-center gap-2 border-gray-600 rounded-3xl text-gray-600 cursor-pointer ">
                                        <RestartAltOutlinedIcon />
                                        <span>Tiet kiem xang</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="p-2 border flex items-center gap-2 border-gray-600 rounded-3xl text-gray-600 cursor-pointer ">
                                        <RestartAltOutlinedIcon />
                                        <span>Tiet kiem xang</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="p-2 border flex items-center gap-2 border-gray-600 rounded-3xl text-gray-600 cursor-pointer ">
                                        <RestartAltOutlinedIcon />
                                        <span>Tiet kiem xang</span>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="p-2 border flex items-center gap-2 border-gray-600 rounded-3xl text-gray-600 cursor-pointer ">
                                        <RestartAltOutlinedIcon />
                                        <span>Tiet kiem xang</span>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>

                        <div className="w-1/10 cursor-pointer">
                            <FilterAltOutlinedIcon />
                            <span>Bo loc</span>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="grid grid-cols-4 gap-5 mt-60">
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
            <Modal
                open={isMap}
                onClose={closeMap}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div className="mx-auto w-10/12">
                    <Map />
                </div>
            </Modal>
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2">
                <Button variant="contained" endIcon={<TravelExploreIcon />} onClick={openMap}>
                    Ban do
                </Button>
            </div>
        </main>
    );
}

export default BikePage;
