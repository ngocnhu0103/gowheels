/* eslint-disable react/prop-types */
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { formartVnd } from "../utils/format";
import { renderStatusBook } from "../utils/renderStatus";
import moment from "moment";
function BookCard({ book, user, updateStatus, paymentDeposit, payment }) {
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
                        <>
                            <Button
                                variant="contained"
                                onClick={() => updateStatus(book.id, { newStatus: "Đã duyệt" })}
                            >
                                Duyệt đơn
                            </Button>
                            <Link to={`/profile/order/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                            <Button variant="text" onClick={() => updateStatus(book.id, { newStatus: "Đã hủy" })}>
                                Hủy đơn
                            </Button>
                        </>
                    );
                case "Đã cọc":
                    return (
                        <>
                            <Button
                                variant="contained"
                                onClick={() => updateStatus(book.id, { newStatus: "Đã bàn giao" })}
                            >
                                Bàn giao
                            </Button>
                            <Link to={`/profile/order/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                            <Button variant="text" onClick={() => updateStatus(book.id, { newStatus: "Đã hủy" })}>
                                Hủy đơn
                            </Button>
                        </>
                    );
                case "Đã hủy":
                    return (
                        <>
                            <Link to={`/profile/order/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                        </>
                    );
                case "Đã xác nhận":
                    return (
                        <>
                            <Link to={`/profile/order/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                        </>
                    );
                case "Đã bàn giao":
                    return (
                        <>
                            <Link to={`/profile/order/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                        </>
                    );
                case "Đang kiểm kê":
                    return (
                        <>
                            <Link to={`/profile/order/${book.id}`}>
                                <Button variant="contained">Thêm phụ thu</Button>
                            </Link>
                            <Button
                                variant="contained"
                                onClick={() => updateStatus(book.id, { newStatus: "Đã xác nhận" })}
                            >
                                Xác nhận
                            </Button>
                            <Link to={`/profile/order/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                        </>
                    );
                default:
                    return (
                        <>
                            <Link to={`/profile/order/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                            <Button variant="text" onClick={() => updateStatus(book.id, { newStatus: "Đã hủy" })}>
                                Hủy đơn
                            </Button>
                        </>
                    );
            }
        } else {
            switch (book.status) {
                case "Đã thanh toán":
                    return (
                        <>
                            <Link to={`/bike/${book.bike.bikeId}`}>
                                <Button variant="outlined">Đặt lại</Button>
                            </Link>
                            <Link to={`/profile/myorder/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                        </>
                    );
                case "Đã hủy":
                    return (
                        <>
                            <Link to={`/profile/order/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                        </>
                    );
                case "Đã duyệt":
                    return (
                        <>
                            <Button variant="contained" onClick={() => paymentDeposit(book.id)}>
                                Thanh toán tiền cọc
                            </Button>
                            <Link to={`/profile/myorder/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                            <Button variant="text" onClick={() => updateStatus(book.id, { newStatus: "Đã hủy" })}>
                                Hủy đơn
                            </Button>
                        </>
                    );
                case "Đã cọc":
                    return (
                        <>
                            <Link to={`/profile/myorder/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                            <Button variant="text" onClick={() => updateStatus(book.id, { newStatus: "Đã hủy" })}>
                                Hủy đơn
                            </Button>
                        </>
                    );
                case "Đã bàn giao":
                    return (
                        <>
                            <Link to={`/profile/myorder/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                            <Button
                                variant="contained"
                                onClick={() => updateStatus(book.id, { newStatus: "Đang kiểm kê" })}
                            >
                                Trả xe
                            </Button>
                        </>
                    );
                case "Đã xác nhận":
                    return (
                        <>
                            <Button variant="contained" onClick={() => payment(book.id)}>
                                Thanh toán
                            </Button>
                            <Link to={`/profile/myorder/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                        </>
                    );
                case "Đang chờ duyệt":
                    return (
                        <>
                            <Link to={`/profile/myorder/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                            <Button variant="text" onClick={() => updateStatus(book.id, { newStatus: "Đã hủy" })}>
                                Hủy đơn
                            </Button>
                        </>
                    );
                default:
                    return (
                        <>
                            <Link to={`/profile/myorder/${book.id}`}>
                                <Button variant="contained">Chi tiết</Button>
                            </Link>
                            <Button variant="text" onClick={() => updateStatus(book.id, { newStatus: "Đã hủy" })}>
                                Hủy đơn
                            </Button>
                        </>
                    );
            }
        }
    };

    return (
        <li className="p-4 bg-white shadow-xl rounded-xl animate-fade-up">
            <div className="flex justify-between h-12 border-b border-gray-300 items-center">
                <div className="flex gap-2 items-center">
                    <Link to={`/profile/${book.bike?.owner.id}`}>
                        <span className="font-semibold hover:text-black/50 ">{book.bike?.owner?.email}</span>
                    </Link>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                        {moment(book.createdOn).locale("vi").fromNow()}
                    </span>
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
