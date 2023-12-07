/* eslint-disable react/prop-types */
import BoltIcon from "@mui/icons-material/Bolt";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookingAPI } from "../../api/bookAPI";
import { showToast } from "../../store/toastSlice";
import { formartDiscountMoney, formartVnd } from "../../utils/format";
import Calendar from "../Calendar";
import { Link } from "react-router-dom";
function BookForm({ price, place, bike }) {
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [totalAmount, setTotalAmount] = useState();
    const [subTotal, setSubTotal] = useState();
    const [space, setSpace] = useState(1);
    const dispatch = useDispatch();
    const saveBookData = () => {
        booking();
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
            bikeId: bike.bikeId,
            paymentMethod: "Thanh toán thẻ",
            startDate: startDate,
            endDate: endDate,
            totalPrice: totalAmount,
        };
        if (!user) {
            return dispatch(showToast({ message: "Bạn chưa đăng nhập", type: "error" }));
        }
        if (user.id === bike?.owner.id) {
            return dispatch(showToast({ message: "Không thể tự đặt xe của mình", type: "error" }));
        }
        if (!user.enabled) {
            dispatch(showToast({ message: "Bạn chưa xác thực email", type: "error" }));
            setOpen(true);
            return;
        }
        await bookingAPI(dispatch, book);
    };
    useEffect(() => {
        let total = space * price;
        if (space >= 7) {
            if (space >= 30) {
                total = total - total * (bike.monthDiscount / 100);
            } else {
                total = total - total * (bike.weekDiscount / 100);
            }
        }
        setSubTotal(total * 0.05);
        total = total + subTotal;
        setTotalAmount(total);
    }, [space, price, subTotal, bike.monthDiscount, bike.weekDiscount]);

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
                <div
                    className={`${
                        showCalendar ? "block" : "hidden"
                    } absolute top-full right-full min-w-[560px] max-md:min-w-full max-md:right-0 bg-gray-200/60 p-4 rounded-lg z-[999]`}
                >
                    <div className="my-4 flex justify-between bg-white p-5 rounded-xl drop-shadow-xl">
                        <div className="flex flex-col gap-2">
                            <span>Đơn giá thuê: {formartVnd(price)}</span>
                            <span>Số ngày thuê: {space} ngày</span>
                            <span>Phí dịch vụ: {formartVnd(subTotal)}</span>
                            <span>
                                Số tiền giảm:{" "}
                                {formartVnd(formartDiscountMoney(space, price, bike.weekDiscount, bike.monthDiscount))}
                            </span>
                            <div className="w-full h-0.5 bg-gray-500"></div>
                            <span>Thành tiền: {formartVnd(totalAmount)}</span>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                            <span className="text-xs text-green-600">
                                Thuê từ 7 ngày để nhận giảm: {bike.weekDiscount}%
                            </span>
                            <span className="text-xs text-green-600">
                                Thuê từ 30 ngày để nhận giảm: {bike.monthDiscount}%
                            </span>
                        </div>
                    </div>
                    <div className="my-4 bg-white p-5 rounded-xl drop-shadow-xl">
                        <p className="text-lg font-semibold">Địa điểm giao xe</p>
                        <p>{place}</p>
                    </div>
                    <Calendar
                        startDate={startDate}
                        endDate={endDate}
                        handleChange={handleChange}
                        timeSelected={timeSelected}
                        setTimeSelected={setTimeSelected}
                        saveCalendar={saveBookData}
                        setShowCalendar={setShowCalendar}
                        name="Đặt xe"
                        show
                        closeCalendar={() => setShowCalendar(false)}
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
                    <span className="font-bold">{formartVnd(subTotal)}</span>
                </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-500">
                    <p>Tổng phí thuê xe</p>
                </div>
                <span className="font-bold">
                    {formartVnd(totalAmount)} / {space} ngày
                </span>
            </div>
            <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-gray-500">
                    <p>Tổng cộng</p>
                </div>
                <span className="font-bold">{formartVnd(totalAmount)}</span>
            </div>

            <Button
                onClick={() => setShowCalendar(true)}
                startIcon={<BoltIcon />}
                variant="contained"
                size="large"
                fullWidth
            >
                Chọn Thuê
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Bạn có muốn xác thực email không?"}</DialogTitle>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Ở lại</Button>
                    <Link to={"/profile/update"}>
                        <Button autoFocus>Xác thực</Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </form>
    );
}

export default BookForm;
