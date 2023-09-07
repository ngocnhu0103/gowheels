import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaceIcon from "@mui/icons-material/Place";
import xe1 from "../assets/xe1.jpg";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Modal } from "@mui/material";
import { useState } from "react";
function Card({ isRow = false, isManage = false }) {
    const [openDeleteBike, setOpenDeleteBike] = useState(false);

    const handleOpenDeleteBike = () => {
        setOpenDeleteBike(true);
    };
    const handleCloseDeleteBike = () => {
        setOpenDeleteBike(false);
    };
    return (
        <li>
            <div className={`p-5 w-full border border-primary/20 rounded-lg shadow ${isRow ? "flex gap-5" : ""}`}>
                <Link to={`/detail/id`}>
                    <img className={`rounded-lg  ${isRow ? "w-60" : ""}`} src={xe1} alt="product image" />
                </Link>

                <div className={` ${isRow ? "pt-0" : "pt-5"}`}>
                    <ul className="flex gap-2 ">
                        <li className="text-[12px] bg-gray-100 p-1 rounded-xl">
                            <span>Tiết kiệm nhiên liệu</span>
                        </li>
                        <li className="text-[12px] bg-gray-100 p-1 rounded-xl">
                            <span>Động cơ êm</span>
                        </li>
                    </ul>
                    <Link to={`/detail/id`}>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Xe Maybach 7 cho
                        </h5>
                    </Link>
                    <div className="text-gray-400 flex items-center">
                        <PlaceIcon fontSize="15px" />
                        <p className="text-sm">Cái Răng, Cần Thơ</p>
                    </div>
                    <div className="flex items-center mt-2.5 mb-5">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>First star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Second star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Third star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Fourth star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Fifth star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                            5.0
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                        <span
                            onClick={(e) => {
                                console.log(e);
                            }}
                        >
                            <FavoriteBorderIcon color="primary" />
                            <FavoriteIcon color="primary" />
                        </span>
                    </div>
                </div>
                {isManage ? (
                    <ul className="ml-auto ">
                        <li className="mb-3 cursor-pointer">
                            <EditIcon />
                        </li>

                        <li className="mb-3 cursor-pointer">
                            <VisibilityOffIcon />
                        </li>
                        <li onClick={handleOpenDeleteBike} className="mb-3 cursor-pointer">
                            <DeleteOutlineIcon />
                        </li>
                        <Modal
                            open={openDeleteBike}
                            onClose={handleCloseDeleteBike}
                            aria-labelledby="parent-modal-title"
                            aria-describedby="parent-modal-description"
                        >
                            <>
                                <div>deleteBike</div>
                            </>
                        </Modal>
                    </ul>
                ) : null}
            </div>
        </li>
    );
}

export default Card;
