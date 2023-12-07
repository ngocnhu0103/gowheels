/* eslint-disable react-hooks/exhaustive-deps */
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getBookDetailAPI, paymentAPI, paymentDepositAPI } from "../api/bookAPI";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navigation from "../components/profile/Navigation";
import { formartVnd } from "../utils/format";
import { renderStatusBook } from "../utils/renderStatus";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, CircularProgress, Modal } from "@mui/material";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { postCommentAPI } from "../api/commentAPI";
import { reportOwnerAPI } from "../api/reportAPI";
import ReviewStartList from "../components/review/ReviewStartList";
import { storage } from "../firebase.config";
import { showToast } from "../store/toastSlice";
function MyOrderDetail() {
    const location = useLocation();
    const { bookId } = useParams();
    const dispatch = useDispatch();

    const activeName = location.pathname.split("/")[location.pathname.split("/").length - 2];
    const { user } = useSelector((state) => {
        return state.auth;
    });
    const { book } = useSelector((state) => {
        return state.book;
    });

    const paymentDeposit = async (bookId) => {
        setLoading("deposit");
        const data = await paymentDepositAPI(dispatch, bookId);
        setLoading("off");
        if (data) {
            await window.location.replace(data);
        } else {
            dispatch(showToast({ message: "Lỗi thanh toán", error: "error" }));
        }
    };
    const payment = async (bookId) => {
        setLoading("payment");
        const data = await paymentAPI(dispatch, bookId);
        setLoading("off");
        if (data) {
            await window.location.replace(data);
        } else {
            dispatch(showToast({ message: "Lỗi thanh toán", error: "error" }));
        }
    };

    // const [subTotal, setSubtotal] = useState(0);
    const [diposit, setDiposit] = useState(0);
    useEffect(() => {
        console.log(bookId, "uff");
        const fetchBookDetail = async () => {
            setLoading(true);
            await getBookDetailAPI(dispatch, bookId);
            setLoading(false);
        };
        fetchBookDetail(bookId);
    }, [bookId, dispatch]);
    useEffect(() => {
        if (book) {
            const temp = book.totalPrice * 0.1;
            setDiposit(temp);
        }
    }, [book]);

    const navigate = useNavigate();
    const [openReview, setOpenReview] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [loading, setLoading] = useState("off");

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
        navigate("/");
    };
    // comment end

    // report
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
        <main className="container w-4/5 mx-auto ">
            <Header />
            <section className="grid grid-cols-3 mt-12 gap-6">
                <Navigation activeName={activeName}></Navigation>
                <div className="col-span-2 rounded-xl p-4">
                    <div>
                        <div className="flex items-center justify-between">
                            <h1 className=" text-3xl font-banner text-primary pb-5">Chi tiết đơn hàng</h1>
                            <Link to={-1}>
                                <ArrowBackIosIcon />
                                <span className="">Quay lại</span>
                            </Link>
                        </div>
                        {book && (
                            <section className="flex flex-col gap-5">
                                <div className="flex gap-2 items-center">
                                    <img
                                        src={book.bike?.owner.avatar.url}
                                        alt=""
                                        height={64}
                                        width={64}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold">{book.bike?.owner.fullName}</h3>
                                        <p className="font-semibold">
                                            Điểm : <span>{book.bike?.owner.point}</span>{" "}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className="font-semibold">
                                            Email : <span className="text-gray-400">{book.bike?.owner.email}</span>{" "}
                                        </p>
                                        <p className="font-semibold">
                                            Số điện thoại :{" "}
                                            <span className="text-gray-400">{book.bike?.owner.phone}</span>{" "}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={book?.bike?.images[0].url}
                                        alt=""
                                        height={160}
                                        width={160}
                                        className="rounded-lg"
                                    />
                                    <div className="flex flex-col gap-2 flex-1">
                                        <h1 className="text-2xl font-semibold">
                                            Tên xe: <span className="text-gray-400">{book.bike?.bikeName}</span>
                                        </h1>
                                        <span className=" font-semibold">
                                            Địa chỉ nhận xe: <span className="text-gray-400">{book.bike?.place}</span>
                                        </span>
                                    </div>
                                    <div>{renderStatusBook(book.status)}</div>
                                </div>
                                <div className="flex flex-col gap-4 items-end">
                                    <div className="flex gap-2 w-[360px] justify-between">
                                        <p className="font-semibold">Ngày thuê:</p>
                                        <p className="font-semibold text-gray-400">
                                            {book.startDate} - {book.endDate}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 w-[360px] justify-between">
                                        <p className="font-semibold">Đơn giá:</p>
                                        <p className="font-semibold text-gray-400">{formartVnd(book.bike?.price)}</p>
                                    </div>

                                    <div className="flex gap-2 w-[360px] justify-between">
                                        <p className="font-semibold">Tiền cọc:</p>
                                        <p className="font-semibold text-gray-400">{formartVnd(diposit)}</p>
                                    </div>
                                    <div className="flex gap-2 w-[360px] justify-between">
                                        <p className="font-semibold">Tạm tính:</p>
                                        <p className="font-semibold text-gray-400">
                                            {diposit
                                                ? formartVnd(book.totalPrice)
                                                : formartVnd(book.totalPrice + diposit)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 w-[360px] justify-between">
                                        <p className="font-semibold">Phụ phí: </p>
                                        <p className="font-semibold text-gray-400">
                                            {" "}
                                            {formartVnd(book.totalPrice * 0.05)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 w-[360px] justify-between">
                                        <p className="font-semibold">Tổng tiền:</p>
                                        <p className="font-semibold text-gray-400">
                                            {diposit
                                                ? formartVnd(book.totalPrice)
                                                : formartVnd(book.totalPrice + diposit)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 justify-end">
                                    {book.status === "Đã duyệt" ? (
                                        <Button
                                            variant="contained"
                                            disabled={loading === "deposit"}
                                            onClick={() => paymentDeposit(bookId)}
                                        >
                                            {loading === "deposit" ? (
                                                <CircularProgress color="inherit" />
                                            ) : (
                                                "Thanh toán tiền cọc"
                                            )}
                                        </Button>
                                    ) : book.status === "Đã xác nhận" ? (
                                        <Button
                                            variant="contained"
                                            disabled={loading === "payment"}
                                            onClick={() => payment(bookId)}
                                        >
                                            {loading === "payment" ? (
                                                <CircularProgress color="inherit" />
                                            ) : (
                                                "Thanh toán"
                                            )}
                                        </Button>
                                    ) : null}
                                </div>

                                {book.status === "Đã thanh toán" ? (
                                    <div className="flex gap-4 justify-end">
                                        {!book.reviewed && (
                                            <Button variant="contained" onClick={() => setOpenReview(true)}>
                                                Đánh giá
                                            </Button>
                                        )}
                                        {!book.reported && (
                                            <Button variant="outlined" onClick={() => setOpenReport(true)}>
                                                Báo cáo chủ xe
                                            </Button>
                                        )}
                                    </div>
                                ) : null}
                            </section>
                        )}
                    </div>
                </div>
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
            </section>
            <Footer />
        </main>
    );
}

export default MyOrderDetail;
