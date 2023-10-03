import React, { useEffect, useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Button } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import Calendar from "../Calendar";
import moment from "moment";
import { formartVnd } from "../../utils/format";
import { bookingAPI } from "../../api/bookAPI";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../store/toastSlice";
function BookForm({ price, place, bikeId }) {
    const user = useSelector((state) => state.auth.user);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [totalAmount, setTotalAmount] = useState();
    const [space, setSpace] = useState(1);
    const dispatch = useDispatch();
    const saveBookData = () => {
        setShowCalendar(false);
    };
    const [timeSelected, setTimeSelected] = useState({
        hour: 9,
        minutes: 30,
    });

    const handleChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        setSpace(moment(end).diff(moment(start), "days"));
    };
    const booking = async () => {
        const book = {
            bikeId: bikeId,
            paymentMethod: "Tra sau",
            startDate: startDate,
            endDate: endDate,
            totalPrice: totalAmount,
        };
        if (!user) {
            return dispatch(showToast({ message: "Bạn chưa đăng nhập", type: "error" }));
        }
        await bookingAPI(dispatch, book);
    };
    useEffect(() => {
        const total = space * price + price * 0.05;
        setTotalAmount(total);
    }, [space, price]);

    return (
        <form className="p-4 bg-primary/5 rounded-xl border border-gray-200">
            <h1 className="text-3xl font-bold">{formartVnd(price)}/ngày</h1>
            <div className="relative p-2 mt-4 rounded-xl border border-gray-200 cursor-pointer bg-white ">
                <div
                    onClick={() => {
                        setShowCalendar(true);
                    }}
                >
                    <div>
                        <p>Nhận xe</p>
                        <div className="flex items-center justify-between mt-2 font-bold">
                            <span>{moment(startDate).format("DD/MM/YYYY")}</span>
                            <span>
                                {timeSelected.hour} : {timeSelected.minutes}
                            </span>
                        </div>
                    </div>
                    <div className="h-[1px] bg-gray-200 my-2"></div>
                    <div>
                        <p>Trả xe</p>
                        <div className="flex items-center justify-between mt-2 font-bold">
                            <span>{moment(endDate).format("DD/MM/YYYY")}</span>
                            <span>
                                {timeSelected.hour} : {timeSelected.minutes}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`${showCalendar ? "block" : "hidden"} absolute top-full right-full w-[530px]`}>
                    <Calendar
                        startDate={startDate}
                        endDate={endDate}
                        handleChange={handleChange}
                        timeSelected={timeSelected}
                        setTimeSelected={setTimeSelected}
                        saveBookData={saveBookData}
                        setShowCalendar={setShowCalendar}
                    />
                </div>
            </div>

            <div className="p-2 mt-4 rounded-xl border border-gray-200 bg-white">
                <p>Địa điểm giao xe</p>
                <h3 className="my-4 font-semibold">{place}</h3>
                <span className="text-xs text-gray-400">
                    Bạn sẽ nhận trả xe tại địa chỉ xe do chủ xe không hỗ trợ giao nhận tận nơi. Địa chỉ cụ thể sẽ được
                    hiển thị sau khi đặt cọc.
                </span>
            </div>
            <div className="mt-4 py-4 border-t border-b border-gray-200 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                        <p>Đơn giá thuê</p>
                        <HelpOutlineIcon fontSize="small" />
                    </div>
                    <span className="font-bold">{formartVnd(price)}/ ngày</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                        <p>Phí dịch vụ</p>
                        <HelpOutlineIcon fontSize="small" />
                    </div>
                    <span className="font-bold">{formartVnd(price * 0.05)}/ ngày</span>
                </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-500">
                    <p>Tổng phí thuê xe</p>
                </div>
                <span className="font-bold">
                    {formartVnd(totalAmount)} x {space} ngày
                </span>
            </div>
            <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-gray-500">
                    <p>Tổng cộng</p>
                </div>
                <span className="font-bold">{formartVnd(totalAmount)}</span>
            </div>
            <Button onClick={booking} startIcon={<BoltIcon />} variant="contained" size="large" fullWidth>
                Chọn Thuê
            </Button>
        </form>
    );
}

export default BookForm;
