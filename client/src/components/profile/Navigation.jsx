import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CommuteIcon from "@mui/icons-material/Commute";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import { Link } from "react-router-dom";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { useDispatch, useSelector } from "react-redux";
import { clearDataUser } from "../../store/authSlice";
function Navigation({ activeName }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => {
        return state.auth.user;
    });
    return (
        <div className="bg-gray-100/90 p-4 rounded-xl">
            <h1 className="text-primary text-3xl font-banner mb-4 ">Xin chào bạn!</h1>
            <ul>
                <li
                    className={`hover:bg-white p-4 border-b font-medium text-lg ${
                        activeName === "update" ? "text-primary" : ""
                    }`}
                >
                    <Link className="flex items-center gap-4" to={"/profile/update"}>
                        <AccountCircleIcon />
                        <span>Tài khoản của tôi</span>
                    </Link>
                </li>
                <li
                    className={`hover:bg-white p-4 border-b font-medium text-lg ${
                        activeName === "favs" ? "text-primary" : ""
                    }`}
                >
                    <Link className="flex items-center gap-4" to={"/profile/favs"}>
                        <FavoriteBorderIcon />
                        <span>Xe yêu thích</span>
                    </Link>
                </li>
                {user.jobber && (
                    <li
                        className={`hover:bg-white p-4 border-b font-medium text-lg ${
                            activeName === "mystranport" ? "text-primary" : ""
                        }`}
                    >
                        <Link className="flex items-center gap-4" to={"/profile/mystranport"}>
                            <TimeToLeaveIcon />
                            <span>Xe của tôi</span>
                        </Link>
                    </li>
                )}
                {user.jobber && (
                    <li
                        className={`hover:bg-white p-4 border-b font-medium text-lg ${
                            activeName === "order" ? "text-primary" : ""
                        }`}
                    >
                        <Link className="flex items-center gap-4" to={"/profile/order"}>
                            <ListAltIcon />
                            <span>Quản lý đơn hàng</span>
                        </Link>
                    </li>
                )}
                <li
                    className={`hover:bg-white p-4 border-b font-medium text-lg ${
                        activeName === "myorder" ? "text-primary" : ""
                    }`}
                >
                    <Link className="flex items-center gap-4" to={"/profile/myorder"}>
                        <CommuteIcon />
                        <span>Đơn hàng của tôi</span>
                    </Link>
                </li>
                {user.jobber && (
                    <li className="hover:bg-white p-4 font-medium text-lg">
                        <Link className="flex items-center gap-4" to={"/profile/analyst"}>
                            <LeaderboardIcon />
                            <span>Thống kê</span>
                        </Link>
                    </li>
                )}
                <li
                    onClick={() => {
                        dispatch(clearDataUser());
                    }}
                    className={`hover:bg-white cursor-pointer p-4 border-b font-medium text-lg ${
                        activeName === "logout" ? "text-primary" : ""
                    }`}
                >
                    <span className="flex items-center gap-4">
                        <ExitToAppIcon />
                        <span>Đăng xuất</span>
                    </span>
                </li>
                {/* <li className="hover:bg-white p-4 font-medium text-lg">
                    <Link className="flex items-center gap-4" to={"/profile/deleteaccount"}>
                        <DeleteOutlineIcon />
                        <span>Yêu cầu xóa tài khoản</span>
                    </Link>
                </li> */}
            </ul>
        </div>
    );
}

export default Navigation;
