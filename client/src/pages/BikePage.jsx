import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../components/Card";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Button, Modal } from "@mui/material";

import "swiper/css";
import Map from "../components/Map";
import { useDispatch, useSelector } from "react-redux";
import { getAllBikeAPI } from "../api/bikeAPI";
import { Suspense } from "react";
import LoadingCard from "../components/loading/LoadingCard";
import Calendar from "../components/Calendar";
import moment from "moment";

function BikePage() {
    let [searchParams, setSearchParams] = useSearchParams();

    const bikes = useSelector((state) => state.bike.bikeList);
    const dispatch = useDispatch();
    const [place, setPlace] = useState(() => {
        return searchParams.get("place");
    });
    const [startDate, setStartDate] = useState(() => {
        return new Date(Number(searchParams.get("startDate")));
    });
    const [endDate, setEndDate] = useState(() => {
        return new Date(Number(searchParams.get("endDate")));
    });
    console.log(startDate, endDate);
    const [hide, setHide] = useState(0);
    const [isMap, setIsMap] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    const [timeSelected, setTimeSelected] = useState(() => {
        return {
            hour: Number(searchParams.get("hour")),
            minutes: Number(searchParams.get("minutes")),
        };
    });

    const [location, setLocation] = useState({
        address: "Ho Chi Minh City, Vietnam",
        lat: 10.762622,
        lng: 106.660172,
    });

    const handleChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const saveOptions = () => {
        setShowCalendar(false);
    };
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setHide(window.scrollY);
        });

        return window.removeEventListener("scroll", () => {
            setHide(window.scrollY);
        });
    }, []);
    const [filter, setFilter] = useState({
        bikeName: "",
        page: 0,
        size: 12,
    });
    const getAllBike = async (dispatch, filter) => {
        await getAllBikeAPI(dispatch, filter);
    };

    useEffect(() => {
        getAllBike(dispatch, filter);
    }, []);
    return (
        <main className="container w-4/5 mx-auto relative" onClick={() => setShowCalendar(false)}>
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
                        <div
                            className="cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowCalendar(true);
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <CalendarMonthIcon />
                                <div className="flex items-center gap-5">
                                    <div className="flex items-center gap-2">
                                        <span>{moment(startDate).format("DD/MM/YYYY")}</span>
                                        <p className="h-[15px] w-[1px] bg-gray-600"></p>
                                        <span>{timeSelected.hour + ":" + timeSelected.minutes}</span>
                                    </div>
                                    <ArrowCircleRightOutlinedIcon />
                                    <div className="flex items-center gap-2">
                                        <span>{moment(endDate).format("DD/MM/YYYY")}</span>
                                        <p className="h-[15px] w-[1px] bg-gray-600"></p>
                                        <span>{timeSelected.hour + ":" + timeSelected.minutes}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`${showCalendar ? "block" : "hidden"} absolute top-full   w-[530px]`}>
                                <Calendar
                                    startDate={startDate}
                                    endDate={endDate}
                                    handleChange={handleChange}
                                    timeSelected={timeSelected}
                                    setTimeSelected={setTimeSelected}
                                    saveCalendar={saveOptions}
                                    setShowCalendar={setShowCalendar}
                                />
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
                <Suspense fallback={<LoadingCard />}>
                    {bikes && bikes.length > 0
                        ? bikes.map((bike) => {
                              return <Card bike={bike} key={bike.id} />;
                          })
                        : null}
                </Suspense>
            </ul>
            <Footer />
            <Modal
                open={isMap}
                onClose={() => {
                    setIsMap(false);
                }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div className="mx-auto mt-10 w-10/12 h-[85vh] rounded-xl overflow-hidden">
                    <Map location={location} zoomLevel={20} />
                </div>
            </Modal>
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2">
                <Button
                    variant="contained"
                    endIcon={<TravelExploreIcon />}
                    onClick={() => {
                        setIsMap(true);
                    }}
                >
                    Bản đồ
                </Button>
            </div>
        </main>
    );
}

export default BikePage;
