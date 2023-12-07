import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { myStranportAPI } from "../api/bikeAPI";
import { getBooksMyBikeAPI } from "../api/bookAPI";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";
import Navigation from "../components/profile/Navigation";
import { formartVnd } from "../utils/format";

function Analyst() {
    const location = useLocation();
    const activeName = location.pathname.split("/")[location.pathname.split("/").length - 1];
    const { user, bookMyBike, myBikes } = useSelector((state) => {
        return state.auth;
    });
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
        let max = countList[0];
        countList.forEach((temp) => {
            if (temp.count > max.count) max = temp;
        });
        return myBikes.find((bike) => bike.bikeId === max.bikeId);
    }, [countList, myBikes]);
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
                        <div className="flex flex-col gap-1 p-4 bg-gray-100 shadow-lg rounded-lg">
                            <h2 className="text-lg font-semibold">Số lượng xe</h2>
                            <span className="text-3xl font-bold text-primary">{myBikes && myBikes.length}</span>
                        </div>
                        <div className="flex flex-col gap-1 p-4 bg-gray-100 shadow-lg rounded-lg">
                            <h2 className="text-lg font-semibold">Số lượng chuyến xe</h2>
                            <span className="text-3xl font-bold text-primary">{bookMyBike && bookMyBike.length}</span>
                            <div>
                                số chuyến hoàn thành : <span className="text-green-600 font-bold">{countSuccess}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 p-4 bg-gray-100 shadow-lg rounded-lg">
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
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default Analyst;
