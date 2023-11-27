/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import Calendar from "../Calendar";
function Search({ showCalendar, setShowCalendar }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [place, setPlace] = useState("");

    const [timeSelected, setTimeSelected] = useState({
        hour: 9,
        minutes: 30,
    });

    const handleChange = (dates, time) => {
        console.log(dates, time);
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const saveOptions = () => {
        setShowCalendar(false);
    };
    return (
        <div className="flex border border-primary rounded-xl max-md:w-full w-4/5 gap-5 justify-between items-center p-5 mx-auto my-5 max-md:flex-col">
            <div className="relative max-md:w-full max-md:after:w-0 after:bg-primary/50 after:w-[1px] after:h-full after:absolute after:left-[110%] after:top-0">
                <label className="block mb-2 text-gray-600 text-sm">Địa điểm</label>
                <input
                    type="text"
                    name="place"
                    autoComplete="off"
                    placeholder="Nhập địa điểm vd: hồ chí minh"
                    className="max-md:w-full outline-none px-3 py-2 rounded-lg bg-gray-100 placeholder:text-sm"
                    value={place}
                    onChange={(e) => {
                        setPlace(e.target.value);
                    }}
                />
            </div>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="max-md:w-full basis-3/5 z-10 relative max-md:after:w-0 after:bg-primary/50 after:w-[1px] after:h-full after:absolute after:left-[100%] after:top-0"
            >
                <div
                    onClick={() => {
                        setShowCalendar(true);
                    }}
                    className="flex gap-5 mx-5 cursor-pointer"
                >
                    <div className="basis-1/2">
                        <p>Nhận xe</p>
                        <div className="flex items-center justify-between mt-2 font-bold">
                            <span>{moment(startDate).format("DD/MM/YYYY")}</span>
                            <span>
                                {timeSelected.hour} : {timeSelected.minutes}
                            </span>
                        </div>
                    </div>
                    <div className="h-[1px] bg-gray-200 my-2"></div>
                    <div className="basis-1/2">
                        <p>Trả xe</p>
                        <div className="flex items-center justify-between mt-2 font-bold">
                            <span>{moment(endDate).format("DD/MM/YYYY")}</span>
                            <span>
                                {timeSelected.hour} : {timeSelected.minutes}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`${showCalendar ? "block" : "hidden"} absolute top-full right-0 w-[530px]`}>
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
            <Link
                to={`/bikes/?startDate=${moment(startDate).format("x")}&endDate=${moment(endDate).format(
                    "x"
                )}&place=${place}&hour=${timeSelected.hour}&minutes=${timeSelected.minutes}`}
            >
                <Button variant="contained" color="primary">
                    Tìm kiếm
                </Button>
            </Link>
        </div>
    );
}

export default Search;
