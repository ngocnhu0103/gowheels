// import React from 'react'
import xe1 from "../assets/xe1.jpg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { formartVnd } from "../utils/format";
import { renderStatusBook } from "../utils/renderStatus";
function BookCard({ book }) {
    console.log(book);
    return (
        <li className="p-4 bg-white shadow-xl rounded-xl">
            <div className="flex justify-between h-12 border-b border-gray-300 items-center">
                <div className="flex gap-2 items-center">
                    <Link to={"/profile/${id nguoi dung}"}>
                        <span className="font-semibold hover:text-black/50 ">Ngan My Store</span>
                    </Link>
                    <Button variant="outlined" startIcon={<ChatBubbleOutlineIcon />} size="small">
                        Chat
                    </Button>
                </div>
                <p className="text-primary font-semibold">{renderStatusBook(book.status)}</p>
            </div>
            <div className="py-5 flex items-center gap-4 border-b border-gray-300">
                <img src={book.bike.images[0].url} alt="product 1" className="w-24 h-24 object-cover rounded-xl" />
                <div>
                    <Link to={`/bike/${book.bike.bikeId}`}>
                        <p className="text-xl font-medium hover:text-black/50 cursor-pointer">{book.bike.bikeName}</p>
                    </Link>
                    <span className="text-sm text-gray-600">Phan loai : {book.bike.category.categoryName}</span>
                </div>
                <p className="ml-auto font-medium">{formartVnd(book.totalPrice)}</p>
            </div>
            <div className="py-5 flex items-center justify-end">
                <span>Tạm tính : </span>
                <span className="text-2xl text-primary">{formartVnd(book.totalPrice)}</span>
            </div>
            <div className="flex justify-end items-center gap-4">
                <Button variant="contained">Đánh giá</Button>
                <Button variant="outlined">Đặt lại</Button>
            </div>
        </li>
    );
}

export default BookCard;
