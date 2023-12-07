/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import Header from "../components/Header";
import Navigation from "../components/profile/Navigation";
import Footer from "../components/Footer";
import { editSurchargeAPI, addSurchargeAPI, getBookDetailAPI, updateStatusBookAPI } from "../api/bookAPI";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    CircularProgress,
    TextField,
    Typography,
} from "@mui/material";
import { renderStatusBook } from "../utils/renderStatus";
import { formartVnd } from "../utils/format";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
function OrderDetail() {
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

    const [surchage, setSurchage] = useState({});
    // [Fetch,FetchDone,Update,UpdateDone,Start,]
    const [loading, setLoading] = useState("start");
    const [expanded, setExpanded] = useState(false);
    const [subTotal, setSubtotal] = useState(0);
    const [diposit, setDiposit] = useState(0);

    useEffect(() => {
        const fetchBookDetail = async () => {
            setLoading("fetch");
            await getBookDetailAPI(dispatch, bookId);
            setLoading("fetch done");
        };

        fetchBookDetail(bookId);
    }, [bookId, dispatch]);
    useEffect(() => {
        if (book) {
            console.log(book);
            const space = moment(moment(book.endDate, "DD/MM/YYYY").toDate()).diff(
                moment(book.startDate, "DD/MM/YYYY").toDate(),
                "days"
            );
            const temp = book.bike?.price * space * 0.1;
            setDiposit(temp);
        }
    }, [book]);

    const sub = useMemo(() => {
        const space = moment(moment(book.endDate, "DD/MM/YYYY").toDate()).diff(
            moment(book.startDate, "DD/MM/YYYY").toDate(),
            "days"
        );
        const currentSub = book.bike?.price * space * 0.05;
        return currentSub + book.surchargePrice;
    }, [book.surchargePrice]);

    const handleSurchage = async (e) => {
        setLoading("update");
        e.preventDefault();

        if (book.note && book.surchagePrice) {
            await editSurchargeAPI(dispatch, bookId, surchage);
        } else {
            await addSurchargeAPI(dispatch, bookId, surchage);
        }
        setLoading("update done");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSurchage({
            ...surchage,
            [name]: value,
        });
    };
    const updateStatus = async (payload) => {
        setLoading("update");
        await updateStatusBookAPI(dispatch, bookId, payload);
        setLoading("update done");
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
                        {loading !== "fetch" && loading !== "start" ? (
                            <section className="flex flex-col gap-5">
                                <div className="flex gap-2 items-center">
                                    <img
                                        src={book?.renter.avatar.url}
                                        alt=""
                                        height={64}
                                        width={64}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold">{book?.renter.fullName}</h3>
                                        <p className="font-semibold">
                                            Địa chỉ : <span>{book?.renter.address}</span>{" "}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className="font-semibold">
                                            Email : <span className="text-gray-400">{book?.renter.email}</span>{" "}
                                        </p>
                                        <p className="font-semibold">
                                            Số điện thoại : <span className="text-gray-400">{book?.renter.phone}</span>{" "}
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
                                    <div className="flex gap-2 w-full max-w-sm justify-between">
                                        <p className="font-semibold">Ngày thuê:</p>
                                        <p className="font-semibold text-gray-400">
                                            {book.startDate} - {book.endDate}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 w-full max-w-sm justify-between">
                                        <p className="font-semibold">Đơn giá:</p>
                                        <p className="font-semibold text-gray-400">{formartVnd(book.bike?.price)}</p>
                                    </div>

                                    <div className="flex gap-2 w-full max-w-sm justify-between">
                                        <p className="font-semibold">Tiền cọc:</p>
                                        <p className="font-semibold text-gray-400">{formartVnd(diposit)}</p>
                                    </div>
                                    <div className="flex gap-2 w-full max-w-sm justify-between">
                                        <p className="font-semibold">Phụ phí: </p>
                                        <p className="font-semibold text-gray-400"> {formartVnd(sub)}</p>
                                    </div>
                                    <div className="flex gap-2 w-full max-w-sm justify-between">
                                        <p className="font-semibold">Tạm tính:</p>
                                        <p className="font-semibold text-gray-400">
                                            {diposit
                                                ? formartVnd(book.totalPrice)
                                                : formartVnd(book.totalPrice + diposit)}
                                        </p>
                                    </div>

                                    {book.status === "Đang kiểm kê" && (
                                        <div className="w-full max-w-sm">
                                            {
                                                <Accordion
                                                    expanded={expanded}
                                                    onChange={() => {
                                                        setExpanded(!expanded);
                                                    }}
                                                >
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel4bh-content"
                                                        id="panel4bh-header"
                                                    >
                                                        <Typography sx={{ width: "50%", flexShrink: 0 }}>
                                                            Phụ thu
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <form className="flex flex-col gap-2">
                                                            <div className="flex gap-2">
                                                                <TextField
                                                                    defaultValue={book.note}
                                                                    label="note"
                                                                    id="filled-hidden-label-small"
                                                                    variant="filled"
                                                                    size="small"
                                                                    name="note"
                                                                    fullWidth
                                                                    onChange={handleChange}
                                                                />
                                                                <TextField
                                                                    defaultValue={book.surchargePrice}
                                                                    label="price"
                                                                    id="filled-hidden-label-small"
                                                                    variant="filled"
                                                                    size="small"
                                                                    name="surchagePrice"
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                            <Button
                                                                disabled={loading === "update"}
                                                                variant="contained"
                                                                type="submit"
                                                                onClick={handleSurchage}
                                                            >
                                                                {loading === "update" ? (
                                                                    <CircularProgress />
                                                                ) : (
                                                                    "Tính phí"
                                                                )}
                                                            </Button>
                                                        </form>
                                                    </AccordionDetails>
                                                </Accordion>
                                            }
                                        </div>
                                    )}

                                    <div className="flex gap-2 w-full max-w-sm justify-between">
                                        <p className="font-semibold">Tổng tiền:</p>
                                        <p className="font-semibold text-gray-400">
                                            {diposit
                                                ? formartVnd(book.totalPrice)
                                                : formartVnd(book.totalPrice + diposit)}
                                        </p>
                                    </div>
                                    {book.status === "Đang kiểm kê" && (
                                        <Button
                                            disabled={loading === "update"}
                                            variant="contained"
                                            onClick={() => updateStatus({ newStatus: "Đã xác nhận" })}
                                        >
                                            {loading === "update" ? <CircularProgress /> : "Xác nhân"}
                                        </Button>
                                    )}
                                    {book.status === "Đã xác nhận" && (
                                        <Button
                                            disabled={loading === "update"}
                                            variant="contained"
                                            color="success"
                                            onClick={() => updateStatus({ newStatus: "Đã thanh toán" })}
                                        >
                                            {loading === "update" ? <CircularProgress /> : "Thanh toán tiền mặc"}
                                        </Button>
                                    )}
                                </div>
                                {/* {book.status === "Đã duyệt" ? (
                                    <Button variant="contained">Thanh toán tiền cọc</Button>
                                ) : book.status === "Đã xác nhận" ? (
                                    <Button variant="contained">Thanh toán</Button>
                                ) : null} */}
                            </section>
                        ) : (
                            <div>Loading........</div>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default OrderDetail;
