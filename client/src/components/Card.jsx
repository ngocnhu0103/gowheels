/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaceIcon from "@mui/icons-material/Place";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Modal } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLiked } from "../utils/userLiked";
import { likeBikeAPI, unLikeBikeAPI, updateStatusBikeAPI } from "../api/bikeAPI";
function Card({ isRow = false, isManage = false, bike }) {
    const [openDeleteBike, setOpenDeleteBike] = useState(false);
    const timer = useRef(null);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const handleOpenDeleteBike = () => {
        setOpenDeleteBike(true);
    };
    const handleCloseDeleteBike = () => {
        setOpenDeleteBike(false);
    };
    const likeBike = async (bikeId) => {
        await likeBikeAPI(dispatch, bikeId);
    };
    const disLikeBike = async (bikeId) => {
        await unLikeBikeAPI(dispatch, bikeId);
    };
    const handleLike = (bikeId) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            likeBike(bikeId);
        }, 500);
    };
    const handleDisLike = (bikeId) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            disLikeBike(bikeId);
        }, 500);
    };
    const changeStatusBike = async (bikeId, newStatus) => {
        await updateStatusBikeAPI(dispatch, bikeId, { newStatus });
    };
    const handleChangeStatus = (bikeId, newStatus) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            changeStatusBike(bikeId, newStatus);
        }, 500);
    };
    return (
        <li>
            <div
                className={`p-5 w-full border border-primary/20  rounded-lg shadow ${
                    isRow ? "flex gap-5" : "min-h-[400px]"
                }`}
            >
                <Link to={`/bike/${bike.bikeId}`}>
                    <img
                        className={`rounded-lg  ${isRow ? "w-60" : "w-full max-h-[180px]"}`}
                        src={bike.images[0].url}
                        alt="product image"
                    />
                </Link>

                <div className={` ${isRow ? "pt-0" : "pt-5"}`}>
                    <ul className="flex gap-2 ">
                        {bike.tagList && bike.tagList.length > 0 ? (
                            bike.tagList.map((tag, index) => {
                                if (index % 2 == 0) {
                                    return (
                                        <li key={tag.tagId} className="text-[12px] bg-gray-100 p-1 rounded-xl">
                                            <span>{tag.tagName}</span>
                                        </li>
                                    );
                                }
                            })
                        ) : (
                            <div className="h-6"></div>
                        )}
                    </ul>
                    <Link to={`/bike/${bike.bikeId}`}>
                        <h5 className="text-xl truncate font-semibold tracking-tight text-gray-900 dark:text-white">
                            {bike.bikeName}
                        </h5>
                    </Link>
                    <div className="text-gray-400 flex items-center">
                        <PlaceIcon fontSize="15px" />
                        <p className="text-sm truncate ">{bike.place}</p>
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
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{bike.price + "K"}</span>
                        {user && (
                            <span
                                className="cursor-pointer"
                                onClick={() => {
                                    if (userLiked(user.likes || [], bike.bikeId)) {
                                        handleDisLike(bike.bikeId);
                                    } else {
                                        handleLike(bike.bikeId);
                                    }
                                }}
                            >
                                {userLiked(user.likes || [], bike.bikeId) ? (
                                    <FavoriteIcon color="primary" />
                                ) : (
                                    <FavoriteBorderIcon color="primary" />
                                )}
                            </span>
                        )}
                    </div>
                </div>
                {isManage ? (
                    <ul className="ml-auto ">
                        <li className="mb-3 cursor-pointer">
                            <EditIcon />
                        </li>

                        <li
                            className="mb-3 cursor-pointer"
                            onClick={() => {
                                if (bike.status === "show") {
                                    handleChangeStatus(bike.bikeId, "hidden");
                                } else {
                                    handleChangeStatus(bike.bikeId, "show");
                                }
                            }}
                        >
                            {bike.status === "show" ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
