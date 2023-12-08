/* eslint-disable react-hooks/exhaustive-deps */
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MapIcon from "@mui/icons-material/Map";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Button, FormControl, InputLabel, MenuItem, Modal, Pagination, Select } from "@mui/material";

import moment from "moment";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import { searchBikesAPI } from "../api/bikeAPI";
import { getTagsAPI } from "../api/tagAPI";
import Calendar from "../components/Calendar";
import Map from "../components/Map";
import LoadingCard from "../components/loading/LoadingCard";
import { checkActived } from "../utils/checkSelectedTag";

function BikePage() {
    let [searchParams, setSearchParams] = useSearchParams();
    const timer = useRef(null);
    const { bikeList, totals } = useSelector((state) => state.bike);
    const tags = useSelector((state) => state.tag.tags);
    const dispatch = useDispatch();
    const [place, setPlace] = useState(() => {
        return searchParams.get("place");
    });
    const [categoryName, setCategoryName] = useState(() => {
        return searchParams.get("categoryName");
    });
    const [startDate, setStartDate] = useState(() => {
        return new Date(Number(searchParams.get("startDate")));
    });
    const [endDate, setEndDate] = useState(() => {
        return new Date(Number(searchParams.get("endDate")));
    });
    const [hide, setHide] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]);

    const addTags = (tagId) => {
        const currentTag = selectedTags.some((t) => t === tagId);
        if (currentTag) {
            setSelectedTags(selectedTags.filter((t) => t !== tagId));
        } else {
            setSelectedTags([...selectedTags, tagId]);
        }
    };
    const [currentLocation, setCurrentLocation] = useState([0, 0]);
    const [isMap, setIsMap] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    const [timeSelected, setTimeSelected] = useState(() => {
        return {
            hour: Number(searchParams.get("hour")),
            minutes: Number(searchParams.get("minutes")),
        };
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
        page: 0,
        size: 12,
    });
    // const getAllBike = async (dispatch, filter) => {
    //     await getAllBikeAPI(dispatch, filter);
    // };
    const searchBike = async (params) => {
        await searchBikesAPI(dispatch, params);
    };
    const fetchTags = async () => {
        await getTagsAPI(dispatch);
    };
    const resetFiltter = () => {
        setCategoryName("");
        setPlace("");
        setStartDate(new Date());
        setEndDate(new Date());
        setTimeSelected({
            hour: Number(new Date().getMinutes() >= 30 ? new Date().getHours() + 1 : new Date().getHours()),
            minutes: Number(new Date().getMinutes() >= 30 ? 0 : 30),
        });
        setSearchParams({
            categoryName: "",
            place: "",
            startDate: moment(new Date()).format("x"),
            endDate: moment(new Date()).format("x"),
            hour: Number(new Date().getMinutes() >= 30 ? new Date().getHours() + 1 : new Date().getHours()),
            minutes: Number(new Date().getMinutes() >= 30 ? 0 : 30),
        });
    };
    // useEffect(() => {
    //     getAllBike(dispatch, filter);

    // }, []);
    useEffect(() => {
        if (tags) {
            fetchTags();
        }
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            searchBike({
                ...filter,
                place,
                categoryName,
                startDate: Date(startDate),
                endDate: Date(endDate),
                tagIds: selectedTags.length > 0 ? selectedTags.join(",") : selectedTags,
            });
        }, 1000);
    }, [place, startDate, endDate, categoryName, selectedTags, filter]);

    return (
        <main className="container w-4/5 max-md:w-11/12 mx-auto relative" onClick={() => setShowCalendar(false)}>
            <div className="fixed left-0 right-0 top-0 bg-white shadow-xl z-[999]">
                <div
                    className={`container w-4/5 mx-auto duration-300   ${
                        hide > 0 ? "-translate-y-20 invisible h-0" : "translate-y-0 visible h-full"
                    }`}
                >
                    <Header />
                </div>

                <div className="h-36 flex flex-col justify-center max-md:h-auto max-md:py-4">
                    <div className="flex items-center justify-center gap-20 max-md:flex-col max-md:gap-5 max-md:items-start">
                        <div className="max-md:w-full max-md:flex max-md:items-center max-md:px-4">
                            <PlaceOutlinedIcon />
                            <input
                                className="flex-1 ml-4 p-2 outline-none bg-gray-100 rounded-xl text-gray-600"
                                value={place}
                                onChange={(e) => {
                                    setPlace(e.target.value);
                                }}
                            />
                        </div>
                        <div
                            className="cursor-pointer max-md:w-full max-md:px-4"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowCalendar(true);
                            }}
                        >
                            <div className="flex items-center gap-2 ">
                                <CalendarMonthIcon />
                                <div className="flex items-center gap-5">
                                    <div className="flex items-center gap-2">
                                        <span>{moment(startDate).format("DD/MM/YYYY")}</span>
                                        <p className="h-[15px] w-[1px] bg-gray-600"></p>
                                        <span>
                                            {timeSelected.hour + ":" + timeSelected.minutes}
                                            {timeSelected.minutes == 0 && "0"}
                                        </span>
                                    </div>
                                    <ArrowCircleRightOutlinedIcon />
                                    <div className="flex items-center gap-2">
                                        <span>{moment(endDate).format("DD/MM/YYYY")}</span>
                                        <p className="h-[15px] w-[1px] bg-gray-600"></p>
                                        <span>
                                            {timeSelected.hour + ":" + timeSelected.minutes}
                                            {timeSelected.minutes == 0 && "0"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={`${showCalendar ? "block" : "hidden"} absolute top-full w-[530px]`}>
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
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small-label">Loại xe</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={categoryName}
                                label="Loại xe"
                                onChange={(e) => {
                                    setCategoryName(e.target.value);
                                    setSearchParams((prev) => [...prev.entries(), ["categoryName", e.target.value]]);
                                }}
                            >
                                <MenuItem value={"Xe oto"}>Xe oto</MenuItem>
                                <MenuItem value={"Xe đạp"}>Xe Đạp</MenuItem>
                                <MenuItem value={"Xe máy"}>Xe Máy</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="w-3/4  mx-auto flex items-center justify-center gap-5 mt-5">
                        <div className="w-1/10" onClick={resetFiltter}>
                            <p className="w-8 h-8 flex items-center justify-center border border-gray-600 text-gray-600 rounded-full cursor-pointer">
                                <RestartAltOutlinedIcon />
                            </p>
                        </div>
                        <div className="w-4/5 max-md:w-full">
                            <Swiper
                                spaceBetween={10}
                                breakpoints={{
                                    576: {
                                        // width: 576,
                                        slidesPerView: 3,
                                    },
                                    768: {
                                        // width: 768,
                                        slidesPerView: 4,
                                    },
                                }}
                                navigation
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log("slide change")}
                            >
                                {tags && tags.length > 0
                                    ? tags.map((item) => {
                                          return (
                                              <SwiperSlide key={item.tagId}>
                                                  <div
                                                      onClick={() => {
                                                          addTags(item.tagId);
                                                      }}
                                                      className={`p-2 border flex items-center gap-2 justify-center min-w-fit rounded-3xl  cursor-pointer 
                                                  ${
                                                      checkActived(selectedTags, item.tagId)
                                                          ? "bg-primary text-white border-0"
                                                          : "text-gray-600 border-gray-600"
                                                  }
                                                  `}
                                                  >
                                                      <span className="whitespace-nowrap">{item.tagName}</span>
                                                  </div>
                                              </SwiperSlide>
                                          );
                                      })
                                    : null}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>

            <ul className="grid grid-cols-4 gap-5 mt-60 max-md:grid-cols-1">
                <Suspense fallback={<LoadingCard />}>
                    {bikeList && bikeList.length > 0
                        ? bikeList.map((bike) => {
                              return <Card bike={bike} key={bike.bikeId} />;
                          })
                        : null}
                </Suspense>
            </ul>
            <div className="w-full mt-5 flex justify-center">
                <Pagination
                    count={Math.ceil(totals / 12)}
                    variant="outlined"
                    shape="rounded"
                    page={filter.page + 1}
                    onChange={(event, value) => {
                        setFilter({ ...filter, page: value - 1 });
                    }}
                />
            </div>
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
                    {bikeList && bikeList.length > 0 && (
                        <Map zoomLevel={20} bikes={bikeList} currentLocation={currentLocation} />
                    )}
                </div>
            </Modal>
            <div className="fixed bottom-5 max-md:bottom-10 left-1/2 -translate-x-1/2">
                <Button
                    variant="contained"
                    endIcon={<MapIcon />}
                    onClick={() => {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((position) => {
                                const latitude = position.coords.latitude;
                                const longitude = position.coords.longitude;
                                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                                setCurrentLocation([latitude, longitude]);
                            });
                        } else {
                            console.log("Geolocation not supported");
                        }

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
