/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Navigation from "../components/profile/Navigation";
import Footer from "../components/Footer";
import { getBookDetailAPI, getSurchagesAPI } from "../api/bookAPI";
import { Button } from "@mui/material";
import { renderStatusBook } from "../utils/renderStatus";
import { formartVnd } from "../utils/format";

function MyOrderDetail() {
    const location = useLocation();
    const { bookId } = useParams();
    const dispatch = useDispatch();

    const activeName = location.pathname.split("/")[location.pathname.split("/").length - 2];
    const { user } = useSelector((state) => {
        return state.auth;
    });
    const { book } = useSelector((state) => {
        return state.book;
    });

    const [loading, setLoading] = useState(false);
    const [subTotal, setSubtotal] = useState(0);
    const [diposit, setDiposit] = useState(0);
    useEffect(() => {
        console.log(bookId, "uff");
        const fetchBookDetail = async () => {
            setLoading(true);
            await getBookDetailAPI(dispatch, bookId);
            setLoading(false);
        };
        fetchBookDetail(bookId);
    }, [bookId, dispatch]);
    useEffect(() => {
        if (book) {
            const temp = book.totalPrice * 0.1;
            setDiposit(temp);
        }
    }, [book]);

    return (
        <main className="container w-4/5 mx-auto ">
            <Header />
            <section className="grid grid-cols-3 mt-12 gap-6">
                <Navigation activeName={activeName}></Navigation>
                <div className="col-span-2 rounded-xl p-4">
                    <div>
                        <h1 className=" text-3xl font-banner text-primary pb-5">Chi tiết đơn hàng</h1>
                        {book && (
                            <section className="flex flex-col gap-5">
                                <div className="flex gap-2 items-center">
                                    <img
                                        src={book.bike?.owner.avatar.url}
                                        alt=""
                                        height={64}
                                        width={64}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold">{book.bike?.owner.fullName}</h3>
                                        <p className="font-semibold">
                                            Điểm : <span>{book.bike?.owner.point}</span>{" "}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className="font-semibold">
                                            Email : <span className="text-gray-400">{book.bike?.owner.email}</span>{" "}
                                        </p>
                                        <p className="font-semibold">
                                            Số điện thoại :{" "}
                                            <span className="text-gray-400">{book.bike?.owner.phone}</span>{" "}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={book?.bike?.images[0].url}
                                        alt=""
                                        height={160}
                                        width={160}
                                        className="rounded-lg"
                                    />
                                    <div className="flex flex-col gap-2 flex-1">
                                        <h1 className="text-2xl font-semibold">
                                            Tên xe: <span className="text-gray-400">{book.bike?.bikeName}</span>
                                        </h1>
                                        <span className=" font-semibold">
                                            Địa chỉ nhận xe: <span className="text-gray-400">{book.bike?.place}</span>
                                        </span>
                                    </div>
                                    <div>{renderStatusBook(book.status)}</div>
                                </div>
                                <div className="flex flex-col gap-4 items-end">
                                    <div className="flex gap-2 w-[360px] justify-between">
                                        <p className="font-semibold">Ngày thuê:</p>
                                        <p className="font-semibold text-gray-400">
                                            {book.startDate} - {book.endDate}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 w-[360px] justify-between">
                                        <p className="font-semibold">Đơn giá:</p>
                                        <p className="font-semibold text-gray-400">{formartVnd(book.bike?.price)}</p>
                                    </div>

                                    <div className="flex gap-2 w-[360px] justify-between">
                                        <p className="font-semibold">Tiền cọc:</p>
                                        <p className="font-semibold text-gray-400">{formartVnd(diposit)}</p>
                                    </div>
                                    <div className="flex gap-2 w-[360px] justify-between">
                                        <p className="font-semibold">Tạm tính:</p>
                                        <p className="font-semibold text-gray-400">
                                            {diposit
                                                ? formartVnd(book.totalPrice)
                                                : formartVnd(book.totalPrice + diposit)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 w-[360px] justify-between">
                                        <p className="font-semibold">Phụ phí: </p>
                                        <p className="font-semibold text-gray-400">
                                            {" "}
                                            {formartVnd(book.totalPrice * 0.05)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 w-[360px] justify-between">
                                        <p className="font-semibold">Tổng tiền:</p>
                                        <p className="font-semibold text-gray-400">
                                            {diposit
                                                ? formartVnd(book.totalPrice)
                                                : formartVnd(book.totalPrice + diposit)}
                                        </p>
                                    </div>
                                </div>
                                {book.status === "Đã duyệt" ? (
                                    <Button variant="contained">Thanh toán tiền cọc</Button>
                                ) : book.status === "Đã xác nhận" ? (
                                    <Button variant="contained">Thanh toán</Button>
                                ) : null}
                            </section>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default MyOrderDetail;
