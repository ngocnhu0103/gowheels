/* eslint-disable react/prop-types */
import { Button, CircularProgress, Modal } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReviewStartList from "./review/ReviewStartList";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { formartVnd } from "../utils/format";
import { renderStatusBook } from "../utils/renderStatus";
import { postCommentAPI } from "../api/commentAPI";
import { showToast } from "../store/toastSlice";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { storage } from "../firebase.config";
import { reportOwnerAPI } from "../api/reportAPI";
function BookCard({ book, user, updateStatus, paymentDeposit, payment }) {
    const navigate = useNavigate();
    const [openReview, setOpenReview] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [loading, setLoading] = useState("off");
    const dispatch = useDispatch();

    // comment start
    const [startNumber, setStartNumber] = useState(0);
    const [content, setContent] = useState("");
    const rating = async () => {
        setLoading("rating");
        await postCommentAPI(dispatch, {
            bookId: book.id,
            ownerId: book.bike?.owner.id,
            startNumber,
            createdAt: new Date(),
            content,
        });
        setLoading("off");
        setContent("");
        setStartNumber(0);
        setOpenReview(false);
    };
    // comment end

    // report start
    const [imgs, setImgs] = useState([]);
    const reporting = async () => {
        setLoading("reporting");
        await reportOwnerAPI(dispatch, {
            bookId: book.id,
            reportedPerson: book.bike?.owner.id,
            timeReport: new Date(),
            content,
            imageList: imgs,
        });
        setLoading("off");
        setContent("");
        setImgs([]);
        setOpenReport(false);
        navigate("/");
    };
    // report end
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
                case "Đã cọc":
                    return (
                        <Button variant="contained" onClick={() => updateStatus(book.id, { newStatus: "Đã bàn giao" })}>
                            Bàn giao
                        </Button>
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
                        </>
                    );
                default:
                    return null;
            }
        } else {
            switch (book.status) {
                case "Đã thanh toán":
                    return (
                        <>
                            {!book.reviewed && (
                                <Button variant="contained" onClick={() => setOpenReview(true)}>
                                    Đánh giá
                                </Button>
                            )}
                            {!book.reported && (
                                <Button variant="contained" onClick={() => setOpenReport(true)}>
                                    Báo cáo chủ xe
                                </Button>
                            )}
                            <Link to={`/bike/${book.bike.bikeId}`}>
                                <Button variant="outlined">Đặt lại</Button>
                            </Link>
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
                        <Button variant="contained" onClick={() => payment(book.id)}>
                            Thanh toán
                        </Button>
                    );
                case "Đang chờ duyệt":
                    return null;
                default:
                    return null;
            }
        }
    };

    const handleUpload = (e) => {
        if (!e.target.files || !e.target.files[0]) return;
        let file = e.target.files[0];
        if (file.size >= 5242880) {
            dispatch(showToast({ message: "Kích thước tệp không được quá 5MB", type: "error" }));
            return;
        }
        setLoading("upload");
        const random = Math.round(Math.random() * 9999);
        const storageRef = ref(storage, `/${file.name}_${random}`);
        const uploadStack = uploadBytesResumable(storageRef, file);

        uploadStack.on(
            "state_changed",
            // eslint-disable-next-line no-unused-vars
            (snapshot) => {},
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadStack.snapshot.ref)
                    .then((downloadURL) => {
                        setImgs([...imgs, downloadURL]);
                    })
                    .finally(() => {
                        setLoading("off");
                    });
            }
        );
    };
    const removeImg = (img) => {
        let imgsRest = imgs.filter((i) => i !== img);
        setImgs([...imgsRest]);
    };
    return (
        <li className="p-4 bg-white shadow-xl rounded-xl">
            <div className="flex justify-between h-12 border-b border-gray-300 items-center">
                <div className="flex gap-2 items-center">
                    <Link to={"/profile/${id nguoi dung}"}>
                        <span className="font-semibold hover:text-black/50 ">{book.bike?.owner?.email}</span>
                    </Link>
                    {/* <Button variant="outlined" startIcon={<ChatBubbleOutlineIcon />} size="small">
                        Chat
                    </Button> */}
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
            {/* Rating */}
            <Modal
                open={openReview}
                onClose={() => {
                    setOpenReview(false);
                }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="w-full max-w-[600px] flex flex-col items-center justify-center gap-10 p-4 rounded-lg bg-white shadow-lg">
                        <h1 className="text-xl font-bold">Đánh giá chủ xe</h1>
                        <form className="w-full items-center flex flex-col gap-4">
                            <ReviewStartList actived={startNumber} addNumberStart={setStartNumber} />
                            <div className="w-full flex flex-col gap-2">
                                <p className="text-lg font-bold">Nội dung</p>
                                <textarea
                                    value={content}
                                    onChange={(e) => {
                                        setContent(e.target.value);
                                    }}
                                    name="content"
                                    rows="4"
                                    className="border w-full p-4"
                                ></textarea>
                            </div>
                        </form>
                        <div className="flex items-center gap-5">
                            <Button variant="contained" onClick={rating} disabled={loading === "rating"}>
                                {loading === "rating" ? "..." : "Đánh giá"}
                            </Button>
                            <Button variant="outlined" onClick={() => setOpenReview(false)}>
                                Hủy
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
            {/* Report */}
            <Modal
                open={openReport}
                onClose={() => {
                    setOpenReport(false);
                }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="w-full max-w-[800px] flex flex-col items-center justify-center gap-10 p-4 rounded-lg bg-white shadow-lg">
                        <h1 className="text-xl font-bold">Báo cáo chủ xe</h1>
                        <form className="w-full items-center flex flex-col gap-4">
                            <label
                                htmlFor="file"
                                className="px-4 py-2 text-center bg-primary text-white cursor-pointer hover:bg-primary/80 rounded"
                            >
                                {loading === "upload" ? <CircularProgress color="inherit" /> : "Chọn tệp"}
                            </label>
                            <input type="file" name="file" id="file" hidden onChange={handleUpload} />
                            {/* preview */}

                            {imgs && imgs.length > 0 && (
                                <ul className="w-full grid grid-cols-3 gap-2">
                                    {imgs.map((img, index) => (
                                        <li key={index} className="relative w-fit">
                                            <img
                                                src={img}
                                                alt=""
                                                width={120}
                                                height={120}
                                                className="rounded-lg duration-300 hover:scale-[200%]"
                                            />
                                            <p
                                                onClick={() => removeImg(img)}
                                                className="absolute -top-2 text-white rounded-full -right-2 cursor-pointer w-8 h-8 flex items-center justify-center bg-gray-500"
                                            >
                                                <DeleteOutlineIcon />
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="w-full flex flex-col gap-2">
                                <p className="text-lg font-bold">Mô tả</p>
                                <textarea
                                    value={content}
                                    onChange={(e) => {
                                        setContent(e.target.value);
                                    }}
                                    name="content"
                                    rows="4"
                                    className="border w-full p-4"
                                ></textarea>
                            </div>
                        </form>
                        <div className="flex items-center gap-5">
                            <Button variant="contained" onClick={reporting} disabled={loading === "reporting"}>
                                {loading === "reporting" ? "..." : "Báo cáo"}
                            </Button>
                            <Button variant="outlined" onClick={() => setOpenReport(false)}>
                                Hủy
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </li>
    );
}

export default BookCard;
