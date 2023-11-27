import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Chip, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import srcBg from "../assets/bg.png";
import FormComfirm from "./auth/FormComfirm";
import FormLogin from "./auth/FormLogin";
import FormRegister from "./auth/FormRegister";
import { clearDataUser } from "../store/authSlice";
function Header() {
    const user = useSelector((state) => {
        return state.auth.user;
    });
    const [openRegister, setOpenRegister] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [isComfirm, setIsComfirm] = useState(false);
    const [isDropdown, setIsDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const handleOpenLogin = () => {
        setOpenLogin(true);
    };
    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    const handleOpenRegister = () => {
        setOpenRegister(true);
    };
    const handleCloseRegister = () => {
        setOpenRegister(false);
    };

    const openComfirm = () => {
        setIsComfirm(true);
    };
    const closeComfirm = () => {
        setIsComfirm(false);
    };

    return (
        <header className="h-20 flex items-center justify-between ">
            <Link to={"/"} className="">
                <img src={srcBg} alt="logo" />
            </Link>

            <div className="relative">
                <div
                    className="hidden cursor-pointer max-md:block"
                    onClick={() => {
                        setShowMenu(!showMenu);
                    }}
                >
                    <MenuIcon />
                </div>
                <div
                    className={`h-full flex items-center duration-300 gap-8 max-md:absolute max-md:w-screen max-md:h-screen max-md:z-[999] max-md:flex-col
                ${
                    showMenu
                        ? " max-md:top-[calc(100%+8px)] max-md:p-4 max-md:right-[calc(100%-52px)] max-md:bg-white max-md:shadow-lg"
                        : " max-md:-right-[10000%] max-md:top-[calc(100%+8px)]"
                }
                `}
                >
                    <ul className="max-md:w-full font-semibold flex max-md:flex-col max-md:gap-4 gap-8">
                        {!user?.jobber && (
                            <li>
                                <Link to={"/profile/update"}>Đăng ký làm chủ xe</Link>
                            </li>
                        )}
                        <li>
                            <Link to={"/about"}>Giới thiệu</Link>
                        </li>
                        <li>
                            <Link to={"/price"}>Bảng giá</Link>
                        </li>
                    </ul>
                    <div className="h-1/2 w-[1px] bg-gray-300 max-md:hidden"></div>
                    <div className="flex gap-8">
                        {user ? (
                            <div className="relative">
                                <Chip
                                    clickable
                                    variant="outlined"
                                    onClick={() => setIsDropdown(!isDropdown)}
                                    label={user.fullName}
                                    avatar={
                                        <Avatar
                                            src={
                                                user?.avatar?.url
                                                    ? user.avatar.url
                                                    : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                                            }
                                        />
                                    }
                                />
                                {isDropdown && (
                                    <ul className="absolute left-0 w-full min-w-[160px] rounded overflow-hidden flex flex-col gap-1 shadow-lg bg-white top-[calc(100%_+_10px)]">
                                        <li className="py-2 px-2 text-gray-700 hover:text-primary hover:bg-white cursor-pointer">
                                            <Link to={"/profile/update"}>Thông tin cá nhân</Link>
                                        </li>
                                        {user.jobber && (
                                            <li className="py-2 px-2 text-gray-700 hover:text-primary hover:bg-white cursor-pointer">
                                                <Link to={"/bikeregister"}>Đăng xe</Link>
                                            </li>
                                        )}

                                        <li
                                            className="py-2 px-2 text-gray-700 hover:text-primary hover:bg-white cursor-pointer"
                                            onClick={() => dispatch(clearDataUser())}
                                        >
                                            Đăng xuất
                                        </li>
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <>
                                <button className="text-primary font-semibold py-2 px-3" onClick={handleOpenLogin}>
                                    Đăng nhập
                                </button>
                                <button
                                    className="text-primary font-semibold border border-primary py-2 px-3 rounded"
                                    onClick={handleOpenRegister}
                                >
                                    Đăng ký
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                open={openLogin}
                onClose={handleCloseLogin}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <>
                    <FormLogin onClose={handleCloseLogin} />
                </>
            </Modal>
            <Modal
                open={isComfirm}
                onClose={closeComfirm}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <>
                    <FormComfirm onClose={closeComfirm} user={user} />
                </>
            </Modal>
            <Modal
                open={openRegister}
                onClose={handleCloseRegister}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <>
                    <FormRegister onClose={handleCloseRegister} openComfirm={openComfirm} />
                </>
            </Modal>
        </header>
    );
}

export default Header;
