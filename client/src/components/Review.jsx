/* eslint-disable react/prop-types */
import { Rating } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";

function Review({ review }) {
    return (
        <li className=" p-8 border border-gray-200 rounded-md">
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
            </div>
            <p className="mt-8 text-gray-500">{review.content}</p>
        </li>
    );
}

export default Review;
