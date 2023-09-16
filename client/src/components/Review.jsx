import { Rating } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Review() {
    return (
        <li className=" p-8 border border-gray-200 rounded-md">
            <div className="flex items-center">
                <div className="flex gap-4">
                    <img
                        src="https://n1-cstg.mioto.vn/m/avatars/avatar-1.png"
                        alt="avatar"
                        className="w-20 h-20 rounded-full border border-gray-300 object-cover"
                    />
                    <div className="flex flex-col">
                        <Link to={"/profile/id"} className="text-2xl font-semibold">
                            Lee Tam
                        </Link>
                        <span className="text-gray-500 flex items-center">
                            <Rating name="half-rating-read" defaultValue={5} precision={5} readOnly />
                        </span>
                    </div>
                </div>
                <span className="text-gray-700 ml-auto">05/09</span>
            </div>
            <p className="mt-8 text-gray-500">Xe tiết kiệm xăng, anh chủ chuyên nghiệp uy tín</p>
        </li>
    );
}

export default Review;
