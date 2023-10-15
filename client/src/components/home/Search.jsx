import { Button } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import moment from "moment";
function Search({ showCalendar, setShowCalendar }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [place, setPlace] = useState("");

    const [timeSelected, setTimeSelected] = useState({
        hour: 9,
        minutes: 30,
    });

    const onChange = (dates, time) => {
        console.log(dates, time);
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    return (
        <div className="flex border border-primary rounded-xl w-4/5 gap-5 justify-between items-center p-5 mx-auto my-5 ">
            <div className="relative after:bg-primary/50 after:w-[1px] after:h-full after:absolute after:left-[110%] after:top-0">
                <label className="block mb-2 text-gray-600 text-sm">Địa điểm</label>
                <input
                    type="text"
                    name="place"
                    className="outline-none px-3 py-2 rounded-lg bg-gray-200"
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
                className="basis-3/5 z-10 relative after:bg-primary/50 after:w-[1px] after:h-full after:absolute after:left-[100%] after:top-0"
            >
                <div
                    className="relative cursor-pointer"
                    onClick={() => {
                        setShowCalendar(!showCalendar);
                    }}
                >
                    <label className="block mb-2 text-gray-600 text-sm">Chọn thời gian</label>
                    <p>
                        {startDate && startDate.toLocaleDateString()} : {endDate && endDate.toLocaleDateString()} :
                        {`${timeSelected.hour}h : ${timeSelected.minutes}p`}
                    </p>
                </div>
                {showCalendar && (
                    <div className="absolute left-0 top-20 bg-white p-5 rounded-xl drop-shadow-xl">
                        <div>
                            <DatePicker
                                selected={startDate}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                minDate={new Date()}
                                showDisabledMonthNavigation
                                onChange={onChange}
                                monthsShown={2}
                                inline
                            />
                        </div>
                        <div>
                            <label className="block my-2 text-gray-600 text-sm">Chọn giờ nhận xe</label>
                            <select
                                name="hour"
                                className="outline-none"
                                value={timeSelected.hour}
                                onChange={(e) => {
                                    setTimeSelected({ ...timeSelected, hour: e.target.value });
                                }}
                            >
                                {hours.map((hour, index) => {
                                    return (
                                        <option key={index} value={hour}>
                                            {hour}
                                        </option>
                                    );
                                })}
                            </select>
                            :
                            <select
                                name="minute"
                                className="outline-none"
                                value={timeSelected.minutes}
                                onChange={(e) => {
                                    setTimeSelected({ ...timeSelected, minutes: e.target.value });
                                }}
                            >
                                <option value="00">00</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                    </div>
                )}
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
