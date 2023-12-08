/* eslint-disable react/prop-types */
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaceIcon from "@mui/icons-material/Place";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Modal } from "@mui/material";
import moment from "moment";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { likeBikeAPI, unLikeBikeAPI, updateStatusBikeAPI } from "../api/bikeAPI";
import { userLiked } from "../utils/userLiked";
import { formartVnd } from "../utils/format";
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
        }, 300);
    };
    const handleDisLike = (bikeId) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            disLikeBike(bikeId);
        }, 300);
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
        <li className="animate-fade-up">
            <div
                className={`p-5 w-full border border-primary/20  rounded-lg shadow ${
                    isRow ? "flex gap-5" : "min-h-[400px]"
                }`}
            >
                <Link to={`/bike/${bike.bikeId}`}>
                    <img
                        className={`rounded-lg  ${
                            isRow ? "w-60 max-h-[180px] object-cover" : "w-full h-[180px] object-cover"
                        }`}
                        src={bike.images[0].url}
                        alt="product image"
                    />
                </Link>

                <div className={` ${isRow ? "pt-0" : "pt-5"}`}>
                    <ul className="flex gap-2 ">
                        {bike.tagList && bike.tagList.length > 0 ? (
                            bike.tagList.slice(0, 2).map((tag) => {
                                return (
                                    <li key={tag.tagId} className="text-[12px] bg-gray-100 p-1 rounded-xl">
                                        <span>{tag.tagName}</span>
                                    </li>
                                );
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
                        <p className="text-sm line-clamp-1 max-w-[375px]">{bike.place}</p>
                    </div>
                    <div className="flex items-center mt-2.5 mb-5">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                            {moment(bike.createdOn).locale("vi").fromNow()}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            {formartVnd(bike.price)}
                        </span>
                        {user && user.id !== bike.owner?.id && (
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
                            <Link to={`/edit/${bike.bikeId}/bike`}>
                                <EditIcon />
                            </Link>
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
