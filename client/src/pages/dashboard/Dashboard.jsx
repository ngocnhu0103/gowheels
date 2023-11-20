import NavDashboard from "../../components/dashboard/NavDashboard";
import { Outlet, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Chip, CircularProgress } from "@mui/material";
import srcBg from "../../assets/bg.png";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function Dashboard() {
    const location = useLocation();
    const activeName = location.pathname.split("/")[location.pathname.split("/").length - 1];
    console.log(activeName);

    const options = {
        plugins: {
            title: {
                display: true,
                text: "Statistics of active Applications",
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
    };
    const labels = ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = {
        labels,
        datasets: [
            {
                label: "Applications",
                data: labels.map(() => [25]),
                backgroundColor: "rgb(75, 192, 192)",
            },
            // {
            //     label: "Shortlisted",
            //     data: labels.map(() => [1231, 3123, 1, 312, 312, 31, 45]),
            //     backgroundColor: " rgb(237,108,2)",
            // },
            // {
            //     label: "Rejected",
            //     data: labels.map(() => [1231, 3123, 1, 312, 312, 31, 45]),
            //     backgroundColor: "rgb(211,47,47)",
            // },
        ],
    };

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
                                <h1 className="font-semibold">Dashboard</h1>
                                <p className="text-sm">Hello,{"Tomas"}. Welcome to Gowheels</p>
                            </div>
                            <div className="w-72 rounded-xl overflow-hidden flex text-gray-500">
                                <input
                                    type="text"
                                    placeholder="Search by anything"
                                    className="w-[85%] p-2 outline-none"
                                />
                                <p className="text-white bg-primary w-[15%] p-2 cursor-pointer">
                                    <SearchIcon />
                                </p>
                            </div>
                            <Chip avatar={<Avatar alt="Natacha" src={srcBg} />} label="Ngoc Nhu" clickable />
                        </div>

                        {activeName !== "admin" ? (
                            <Outlet />
                        ) : (
                            <div className="mt-5">
                                <div className="flex gap-5">
                                    <div className="flex p-5 items-center gap-5 bg-white">
                                        <div className="flex gap-2 flex-col">
                                            <p className="text-gray-400">Totals Aplications</p>
                                            <p className="text-2xl font-semibold">5672</p>
                                            <p className="flex gap-2 text-sm text-gray-400">
                                                <TrendingUpIcon color="success" />
                                                <span>+14% Inc</span>
                                            </p>
                                        </div>
                                        <div className="relative w-max">
                                            <CircularProgress
                                                variant="determinate"
                                                value={75}
                                                size={50}
                                                color="success"
                                            />
                                            <p className="absolute top-1/4 left-2 text-[12px] font-semibold ">+75%</p>
                                        </div>
                                    </div>
                                    <div className="flex p-5 items-center gap-5 bg-white">
                                        <div className="flex gap-2 flex-col">
                                            <p className="text-gray-400"> Shortlisted Candidates</p>
                                            <p className="text-2xl font-semibold">3024</p>
                                            <p className="flex gap-2 text-sm text-gray-400">
                                                <TrendingUpIcon color="warning" />
                                                <span>+14% Inc</span>
                                            </p>
                                        </div>
                                        <div className="relative w-max">
                                            <CircularProgress
                                                variant="determinate"
                                                value={75}
                                                size={50}
                                                color="warning"
                                            />
                                            <p className="absolute top-1/4 left-2 text-[12px] font-semibold ">+75%</p>
                                        </div>
                                    </div>
                                    <div className="flex p-5 items-center gap-5 bg-white">
                                        <div className="flex gap-2 flex-col">
                                            <p className="text-gray-400">Rejected Candidates</p>
                                            <p className="text-2xl font-semibold">1025</p>
                                            <p className="flex gap-2 text-sm text-gray-400">
                                                <TrendingUpIcon color="error" />
                                                <span>+14% Inc</span>
                                            </p>
                                        </div>
                                        <div className="relative w-max">
                                            <CircularProgress
                                                variant="determinate"
                                                value={75}
                                                size={50}
                                                color="error"
                                            />
                                            <p className="absolute top-1/4 left-2 text-[12px] font-semibold ">+75%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 w-8/12">
                                    <Bar options={options} data={data} />
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Dashboard;
