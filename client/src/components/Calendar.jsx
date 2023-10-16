import { Button } from "@mui/material";
import DatePicker from "react-datepicker";

function Calendar({ saveCalendar, startDate, endDate, handleChange, timeSelected, setTimeSelected }) {
    const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    return (
        <div className="w-full bg-white p-5 rounded-xl drop-shadow-xl">
            <DatePicker
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                minDate={new Date()}
                showDisabledMonthNavigation
                onChange={handleChange}
                monthsShown={2}
                inline
            />
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
            <div className="mt-4 flex justify-end">
                <Button variant="contained" size="medium" onClick={saveCalendar}>
                    Áp dụng
                </Button>
            </div>
        </div>
    );
}

export default Calendar;
