/* eslint-disable react/prop-types */
import srcBg from "../../assets/bg.png";
import { Link } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import PolicyIcon from "@mui/icons-material/Policy";
function NavDashboard({ activeName }) {
    return (
        <div>
            <Link to={"/admin"}>
                <img src={srcBg} alt="logo" className="object-fill mx-auto" />
            </Link>
            <div className="flex flex-col gap-4">
                <div>
                    <p className="font-bold px-2">DANH MỤC</p>
                    <ul className="mt-4 flex flex-col gap-2">
                        <li>
                            <Link
                                to={"/admin"}
                                className={`px-2 py-3 flex gap-2 items-center text-gray-500 rounded-xl duration-200
                            ${activeName === "admin" ? "bg-primary text-white" : "hover:bg-primary hover:text-white"}
                            `}
                            >
                                <GridViewIcon />
                                <span className="font-semibold">Thống kê</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to={"/admin/report"}
                                className={`px-2 py-3 flex gap-2 items-center text-gray-500 rounded-xl duration-200
                            ${activeName === "report" ? "bg-primary text-white" : "hover:bg-primary hover:text-white"}
                            `}
                            >
                                <PolicyIcon />
                                <span className="font-semibold">Báo cáo</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* <div>
                    <p className="font-bold px-2">MENU</p>
                    <ul className="mt-4 flex flex-col gap-2">
                        <li>
                            <Link
                                to={"/admin"}
                                className={`px-2 py-3 flex gap-2 items-center text-gray-500 rounded-xl duration-200 ${
                                    activeName === "admin"
                                        ? "bg-primary text-white"
                                        : "hover:bg-primary hover:text-white"
                                }
                                `}
                            >
                                <GridViewIcon />
                                <span className="font-semibold">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/admin/user"}
                                className={`px-2 py-3 flex gap-2 items-center text-gray-500 rounded-xl duration-200
                                ${activeName === "user" ? "bg-primary text-white" : "hover:bg-primary hover:text-white"}
                                `}
                            >
                                <PeopleOutlineIcon />
                                <span className="font-semibold">User</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/admin/policy"}
                                className={`px-2 py-3 flex gap-2 items-center text-gray-500 rounded-xl duration-200
                                ${
                                    activeName === "policy"
                                        ? "bg-primary text-white"
                                        : "hover:bg-primary hover:text-white"
                                }
                                `}
                            >
                                <PolicyIcon />
                                <span className="font-semibold">Policy</span>
                            </Link>
                        </li>
                    </ul>
                </div> */}
            </div>
        </div>
    );
}

export default NavDashboard;
