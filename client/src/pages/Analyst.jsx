/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { myStranportAPI } from "../api/bikeAPI";
import { getBooksMyBikeAPI } from "../api/bookAPI";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navigation from "../components/profile/Navigation";
import { formartVnd } from "../utils/format";
import { Bar } from "react-chartjs-2";
import { formatDateVN } from "../utils/formatDate";
import { labels, months } from "../contants";

function Analyst() {
    const location = useLocation();
    const activeName = location.pathname.split("/")[location.pathname.split("/").length - 1];
    const { user, bookMyBike, myBikes } = useSelector((state) => {
        return state.auth;
    });

    const [number, setNumber] = useState(2);
    const [data, setData] = useState();
    const optionsCol = {
        plugins: {
            title: {
                display: true,
                text: "Biểu đồ thể hiện số lượng đơn hàng theo tháng",
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
        ticks: {
            precision: 0,
        },
    };

    const dipatch = useDispatch();
    const fetchAllBooks = async () => {
        await getBooksMyBikeAPI(dipatch);
    };
    const fetchAllbikes = async () => {
        await myStranportAPI(dipatch);
    };

    const revenue = useMemo(() => {
        return bookMyBike.reduce((pre, curr) => {
            if (curr.status === "Đã thanh toán") {
                return (pre += curr.totalPrice);
            }
            return pre;
        }, 0);
    }, [bookMyBike]);

    const countSuccess = useMemo(() => {
        return bookMyBike.filter((b) => b.status === "Đã thanh toán").length;
    }, [bookMyBike]);

    const countList = useMemo(() => {
        if (bookMyBike && bookMyBike.length <= 0) return;
        return bookMyBike.map((b) => {
            let count = bookMyBike.reduce((pre, curr) => {
                if (curr.bike.bikeId === b.bike.bikeId) {
                    return (pre += 1);
                }
                return pre;
            }, 0);
            return {
                bikeId: b.bike.bikeId,
                count: count,
            };
        });
    }, [bookMyBike]);

    const bikeMost = useMemo(() => {
        if (!myBikes || myBikes.length <= 0) return;
        if (!countList || countList.length <= 0) return;
        let max = countList[0];
        countList.forEach((temp) => {
            if (temp.count > max.count) max = temp;
        });
        return myBikes.find((bike) => bike.bikeId === max.bikeId);
    }, [countList, myBikes]);
    const bikeList = useMemo(() => {
        if (!myBikes || myBikes.length <= 0) return;
        if (!countList || countList.length <= 0) return;
        return myBikes.map((bike) => {
            const count = countList.find((temp) => temp.bikeId === bike.bikeId);
            return {
                count: count?.count || 0,
                bike,
            };
        });
    }, [countList, myBikes]);
    const countBookByMonth = (month, bookList) => {
        const arr = bookList.filter((book) => {
            const m = formatDateVN(new Date(book.createdOn).getMonth());
            return m === month;
        });
        return arr;
    };
    useEffect(() => {
        setData({
            labels: labels,
            datasets: [
                {
                    label: "Đơn hàng",
                    data: months.map((month) => countBookByMonth(month, bookMyBike).length),
                    backgroundColor: "rgb(75, 192, 192)",
                },
            ],
        });
    }, [bookMyBike]);

    useEffect(() => {
        fetchAllBooks();
        fetchAllbikes();
    }, []);
    return (
        <main className="container w-4/5 mx-auto ">
            <Header />

            <section className="grid grid-cols-3 mt-12 gap-6">
                <Navigation activeName={activeName}></Navigation>
                <div className="col-span-2 rounded-xl p-4">
                    {/* quanlty */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1 p-4 bg-gray-100 shadow-lg rounded-lg animate-fade-right">
                            <h2 className="text-lg font-semibold">Số lượng xe</h2>
                            <span className="text-3xl font-bold text-primary">{myBikes && myBikes.length}</span>
                        </div>
                        <div className="flex flex-col gap-1 p-4 bg-gray-100 shadow-lg rounded-lg animate-fade-down">
                            <h2 className="text-lg font-semibold">Số lượng chuyến xe</h2>
                            <span className="text-3xl font-bold text-primary">{bookMyBike && bookMyBike.length}</span>
                            <div>
                                số chuyến hoàn thành : <span className="text-green-600 font-bold">{countSuccess}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 p-4 bg-gray-100 shadow-lg rounded-lg animate-fade-left">
                            <h2 className="text-lg font-semibold">Doanh thu</h2>
                            <span className="text-3xl font-bold text-primary">{formartVnd(revenue)}</span>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold mb-5">Xe được đặt nhiều nhất</h1>
                            <Link to="/profile/order" className="text-blue-600">
                                Quản lý đơn hàng
                            </Link>
                        </div>
                        <ul>{bikeMost && <Card bike={bikeMost} isRow />}</ul>
                        <div className="flex flex-col gap-2 my-5">
                            <h1 className="text-xl font-bold mb-5">Danh sách xe</h1>
                            <ul className="w-full flex flex-col gap-2">
                                {bikeList &&
                                    bikeList?.slice(0, number).map((data, i) => (
                                        <div key={i} className="relative">
                                            <Card bike={data.bike} isRow />
                                            <p className="absolute bottom-2 right-2 py-2 px-4 rounded-xl bg-black/5 text-primary border border-primary">
                                                Số lượng đặt: {data?.count || 0}
                                            </p>
                                        </div>
                                    ))}
                            </ul>
                            {bikeList && bikeList.length > number && (
                                <div className="flex justify-center">
                                    <Button
                                        variant="contained"
                                        color="info"
                                        size="md"
                                        className="w-fit"
                                        onClick={() => setNumber(number + 2)}
                                    >
                                        Xem thêm
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-5">{data && <Bar options={optionsCol} data={data} />}</div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default Analyst;
