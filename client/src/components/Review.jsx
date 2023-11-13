/* eslint-disable react/prop-types */
import { Rating } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentAPI } from "../api/commentAPI";
import { useState } from "react";
import ComfirmModal from "./modal/ComfirmModal";

function Review({ review }) {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [openComfirm, setOpenComfirm] = useState(false);
    const handleDelete = async () => {
        await deleteCommentAPI(dispatch, review.id);
    };
    return (
        <li className="p-8 border border-gray-200 rounded-md relative">
            <div className="flex items-center">
                <div className="flex gap-4">
                    <img
                        src={review.author?.avatar.url}
                        alt="avatar"
                        className="w-20 h-20 rounded-full border border-gray-300 object-cover"
                    />
                    <div className="flex flex-col">
                        <Link to={`/profile/${review.author?.id}`} className="text-2xl font-semibold">
                            {review.author?.email}
                        </Link>
                        <span className="text-gray-500 flex items-center">
                            <Rating
                                name="half-rating-read"
                                defaultValue={review.startNumber}
                                precision={review.startNumber}
                                readOnly
                            />
                        </span>
                    </div>
                </div>
                <span className="text-gray-700 ml-auto">{moment(review.createdAt).fromNow()}</span>
                {user && user.id === review.author?.id && (
                    <div
                        onClick={() => setOpenComfirm(true)}
                        className="absolute text-gray-700 hover:scale-[200%] duration-300 shadow-lg top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                    >
                        <DeleteOutlineIcon />
                    </div>
                )}
            </div>
            <p className="mt-8 text-gray-500">{review.content}</p>
            <ComfirmModal
                handle={handleDelete}
                title={"Xóa đánh giá này"}
                buttonName="Đồng ý"
                open={openComfirm}
                onClose={() => {
                    setOpenComfirm(false);
                }}
            />
        </li>
    );
}

export default Review;
