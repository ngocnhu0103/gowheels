import NavDashboard from "../../components/dashboard/NavDashboard";
import { Outlet, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Chip, CircularProgress } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBikesForStatisticalAPI, getBooksForStatisticalAPI } from "../../api/statisticalAPI";
import { clearDataUser } from "../../store/authSlice";
import { formatDateVN } from "../../utils/formatDate";
import { formartVnd } from "../../utils/format";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function Dashboard() {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const activeName = location.pathname.split("/")[location.pathname.split("/").length - 1];

    const dispatch = useDispatch();
    const [transports, setTransports] = useState([]);
    const [books, setBooks] = useState({
        failed: [],
        success: [],
        totals: [],
    });
    const [data, setData] = useState();
    const countBookByMonth = (month, bookList) => {
        const arr = bookList.filter((book) => {
            const m = formatDateVN(new Date(book.createdOn).getMonth());
            return m === month;
        });
        console.log(arr, "ar", month);
        return arr;
    };
    const countbikeByMonth = (month, transports) => {
        if (transports.length == 0) return 0;
        return transports.filter((bike) => {
            const m = formatDateVN(new Date(bike.createdOn).getMonth());
            return m === month;
        });
    };
    const options = {
        plugins: {
            title: {
                display: true,
                text: "Thống kê đơn hàng",
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
    const labels = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
    ];
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    useEffect(() => {
        setData({
            labels,
            datasets: [
                {
                    label: "Đơn hàng",
                    data: months.map((month) => countBookByMonth(month, books.totals).length),
                    backgroundColor: "rgb(75, 192, 192)",
                },
            ],
        });
    }, [books.totals]);
    const [isDropdown, setIsDropdown] = useState(false);
    useEffect(() => {
        const fetchAllTransport = async () => {
            const res = await getBikesForStatisticalAPI();
            setTransports(res);
        };
        const fetchAllBook = async () => {
            const res = await getBooksForStatisticalAPI();
            setBooks({
                totals: res,
                success: res.filter((b) => b.status === "Đã thanh toán"),
                failed: res.filter((b) => b.status === "Đã hủy"),
            });
        };
        fetchAllTransport();
        fetchAllBook();
    }, []);
    return (
        <main className="max-w-full h-screen">
            <div className="grid grid-cols-12  bg-violet-100/50">
                <nav className="col-span-2 bg-white px-2">
                    <NavDashboard activeName={activeName} />
                </nav>
                <section className="col-span-10 h-screen overflow-y-auto">
                    <div className="pt-5 px-4 ">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="font-semibold">Thống kê</h1>
                                <p className="text-sm">Chào, {user.fullName}. Chào mừng bạn đến Gowheels</p>
                            </div>
                            {/* <div className="w-[400px] rounded-xl overflow-hidden flex text-gray-500">
                                <input
                                    type="text"
                                    placeholder="Search by anything"
                                    className="w-full p-2 outline-none"
                                />
                                <p className="text-white bg-primary w-[10%] p-2 cursor-pointer">
                                    <SearchIcon />
                                </p>
                            </div> */}
                            <div className="relative">
                                <Chip
                                    avatar={<Avatar alt="Natacha" src={user.avatar.url} />}
                                    label={user.fullName}
                                    clickable
                                    onClick={() => setIsDropdown(!isDropdown)}
                                />
                                {isDropdown && (
                                    <ul className="absolute right-0 w-full min-w-[120px] rounded overflow-hidden flex flex-col gap-1 shadow-lg bg-gray-500 top-[calc(100%_+_10px)]">
                                        <li
                                            className="py-2 px-2 text-white hover:text-primary hover:bg-white cursor-pointer"
                                            onClick={() => dispatch(clearDataUser())}
                                        >
                                            Đăng xuất
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>

                        {activeName !== "admin" ? (
                            <Outlet />
                        ) : (
                            <div className="mt-5">
                                <div className="flex gap-5">
                                    <div className="flex p-5 items-center gap-5 bg-white">
                                        <div className="flex gap-2 flex-col">
                                            <p className="text-gray-400">Tổng phương tiện</p>
                                            <p className="text-2xl font-semibold">{transports && transports.length}</p>
                                            <p className="flex gap-2 text-sm text-gray-400">
                                                <TrendingUpIcon color="success" />
                                                <span>
                                                    +
                                                    {transports &&
                                                        (
                                                            (countbikeByMonth(new Date().getMonth(), transports)
                                                                .length /
                                                                transports.length) *
                                                            100
                                                        ).toFixed(2)}
                                                    %
                                                </span>
                                            </p>
                                        </div>
                                        {/* <div className="relative w-max">
                                            <CircularProgress
                                                variant="determinate"
                                                value={75}
                                                size={50}
                                                color="success"
                                            />
                                            <p className="absolute top-1/4 left-2 text-[12px] font-semibold ">+ 75 %</p>
                                        </div> */}
                                    </div>
                                    <div className="flex p-5 items-center gap-5 bg-white">
                                        <div className="flex gap-2 flex-col">
                                            <p className="text-gray-400">Tổng đơn hàng</p>
                                            <p className="text-2xl font-semibold">{books && books.totals.length}</p>
                                            <p className="flex gap-2 text-sm text-gray-400">
                                                <TrendingUpIcon color="success" />
                                                <span>
                                                    +
                                                    {books &&
                                                        (
                                                            (countBookByMonth(
                                                                formatDateVN(new Date().getMonth()),
                                                                books.totals
                                                            ).length /
                                                                books.totals.length) *
                                                            100
                                                        ).toFixed(2)}
                                                    %
                                                </span>
                                            </p>
                                        </div>
                                        {/* <div className="relative w-max">
                                            <CircularProgress
                                                variant="determinate"
                                                value={
                                                    books
                                                        ? (countBookByMonth(
                                                              formatDateVN(new Date().getMonth()),
                                                              books.totals
                                                          ).length /
                                                              books.totals.length) *
                                                          100
                                                        : 0
                                                }
                                                size={50}
                                                color="success"
                                            />
                                            <p className="absolute top-1/4 left-2 text-[12px] font-semibold ">
                                                +
                                                {books &&
                                                    (countBookByMonth(formatDateVN(new Date().getMonth()), books.totals)
                                                        .length /
                                                        books.totals.length) *
                                                        100}
                                                %
                                            </p>
                                        </div> */}
                                    </div>
                                    <div className="flex p-5 items-center gap-5 bg-white">
                                        <div className="flex gap-2 flex-col">
                                            <p className="text-gray-400">Đơn thành công</p>
                                            <p className="text-2xl font-semibold">{books && books.success.length}</p>
                                            <p className="flex gap-2 text-sm text-gray-400">
                                                <TrendingUpIcon color="warning" />
                                                <span>
                                                    +
                                                    {books && books.success.length > 0
                                                        ? (
                                                              (countBookByMonth(
                                                                  formatDateVN(new Date().getMonth()),
                                                                  books.success
                                                              ).length /
                                                                  books.success.length) *
                                                              100
                                                          ).toFixed(2)
                                                        : 0}
                                                    %{" "}
                                                </span>
                                            </p>
                                        </div>
                                        {/* <div className="relative w-max">
                                            <CircularProgress
                                                variant="determinate"
                                                value={75}
                                                size={50}
                                                color="warning"
                                            />
                                            <p className="absolute top-1/4 left-2 text-[12px] font-semibold ">+75%</p>
                                        </div> */}
                                    </div>
                                    <div className="flex p-5 items-center gap-5 bg-white">
                                        <div className="flex gap-2 flex-col">
                                            <p className="text-gray-400">Đơn bị hủy</p>
                                            <p className="text-2xl font-semibold">{books && books.failed.length}</p>
                                            <p className="flex gap-2 text-sm text-gray-400">
                                                <TrendingUpIcon color="error" />
                                                <span>
                                                    +
                                                    {books && books.failed.length > 0
                                                        ? (
                                                              (countBookByMonth(
                                                                  formatDateVN(new Date().getMonth()),
                                                                  books.failed
                                                              ).length /
                                                                  books.failed.length) *
                                                              100
                                                          ).toFixed(2)
                                                        : 0}
                                                    %{" "}
                                                </span>
                                            </p>
                                        </div>
                                        {/* <div className="relative w-max">
                                            <CircularProgress
                                                variant="determinate"
                                                value={75}
                                                size={50}
                                                color="error"
                                            />
                                            <p className="absolute top-1/4 left-2 text-[12px] font-semibold ">+75%</p>
                                        </div> */}
                                    </div>
                                    <div className="flex p-5 gap-5 bg-white">
                                        <div className="flex gap-2 flex-col">
                                            <p className="text-gray-400">Chiết khấu</p>
                                            <p className="text-2xl font-semibold">{user && formartVnd(user.balance)}</p>
                                            {/* <p className="flex gap-2 text-sm text-gray-400">
                                                <TrendingUpIcon color="error" />
                                                <span>+14% </span>
                                            </p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 w-8/12">{data && <Bar options={options} data={data} />}</div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Dashboard;
