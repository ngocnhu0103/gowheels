/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { formartVnd } from "../utils/format";
import { renderStatusBook } from "../utils/renderStatus";

function BookCard({ book, user, updateStatus, paymentDeposit }) {
    const renderByUser = (book, user) => {
        // owner
        if (user.email === book?.bike?.owner.email) {
            switch (book.status) {
                case "Đã thanh toán":
                    return (
                        <>
                            <Link to={`/profile/order/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                        </>
                    );
                case "Đang chờ duyệt":
                    return (
                        <Button variant="contained" onClick={() => updateStatus(book.id, { newStatus: "Đã duyệt" })}>
                            Duyệt đơn
                        </Button>
                    );
                case "Đang kiểm kê":
                    return <Button variant="contained">Xác nhận</Button>;
                default:
                    return null;
            }
        } else {
            switch (book.status) {
                case "Đã thanh toán":
                    return (
                        <>
                            <Button variant="contained">Đánh giá</Button>
                            <Button variant="outlined">Đặt lại</Button>
                            <Link to={`/profile/myorder/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                        </>
                    );
                case "Đã duyệt":
                    return (
                        <Button variant="contained" onClick={() => paymentDeposit(book.id)}>
                            Thanh toán tiền cọc
                        </Button>
                    );
                case "Đã cọc":
                    return (
                        <Link to={`/profile/myorder/${book.id}`}>
                            <Button variant="contained">Chi tiết</Button>
                        </Link>
                    );
                case "Đã xác nhận":
                    return <Button variant="contained">Thanh toán</Button>;
                case "Đang chờ duyệt":
                    return null;
                default:
                    return null;
            }
        }
    };

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
                <div>{renderStatusBook(book.status)}</div>
            </div>
            <div className="w-full py-5 flex items-center gap-4 border-b border-gray-300">
                <img src={book?.bike?.images[0]?.url} alt="product 1" className="w-24 h-24 object-cover rounded-xl" />
                <div>
                    <Link to={`/bike/${book.bike.bikeId}`}>
                        <p className="text-xl font-medium hover:text-black/50 cursor-pointer">{book.bike.bikeName}</p>
                    </Link>
                    <span className="text-sm text-gray-600">Loại xe: {book.bike.category.categoryName}</span>
                </div>
                <div className=" ml-auto">
                    <p className="font-medium flex gap-5 justify-between">
                        <span className="font-bold">Tiền cọc:</span>
                        <span className="">
                            {formartVnd(book.totalPrice * 0.1)} {book.deposit && <CheckCircleIcon color="success" />}
                        </span>
                    </p>
                    <p className="font-medium flex gap-5 justify-between">
                        <span className="font-bold">Tiền thuê:</span>{" "}
                        <span>{formartVnd(book.totalPrice - book.totalPrice * 0.1)}</span>
                    </p>
                </div>
            </div>

            <div className="py-5 flex items-center justify-end">
                <span>Tạm tính : </span>
                <span className="text-2xl text-primary">{formartVnd(book.totalPrice)}</span>
            </div>
            <div className="flex justify-end items-center gap-4">{renderByUser(book, user)}</div>
        </li>
    );
}

export default BookCard;
