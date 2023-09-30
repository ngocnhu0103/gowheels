import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tag from "../components/Tag";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InfoIcon from "@mui/icons-material/Info";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import StyleIcon from "@mui/icons-material/Style";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import Map from "../components/Map";
import Card from "../components/Card";
import { Link, useParams } from "react-router-dom";
import Review from "../components/Review";
import { Button } from "@mui/material";
import BookForm from "../components/form/BookForm";
import { getBikeAPI } from "../api/bikeAPI";
import { useDispatch, useSelector } from "react-redux";
function DetailBike() {
    const [showPolicy, setShowPolicy] = useState(false);
    const { bikeId } = useParams();
    const dispatch = useDispatch();
    const { bike } = useSelector((state) => state.bike);
    const [location, setLocation] = useState({
        address: "Tân Bình, Hồ Chí Minh, Vietnam",
        lat: 10.802029,
        lng: 106.649307,
    });
    const tags = [
        {
            id: 1,
            tagName: "Tiết kiếm xăng",
        },
        {
            id: 2,
            tagName: "Tiết kiếm điện",
        },
        {
            id: 3,
            tagName: "Bản đồ",
        },
        {
            id: 4,
            tagName: "ETC",
        },
    ];
    const rows = [
        {
            stt: 1,
            title: "Trong Vòng 1h Sau Đặt Cọc",
            customer: "Khách Thuê Hủy Chuyến",
            owner: (
                <span className="text-center">
                    Không đền cọc <br /> (Đánh giá hệ thống 3*)
                </span>
            ),
        },
        {
            stt: 2,

            title: "Trước Chuyến Đi >7 Ngày",
            customer: "Hoàn tiền 70%",
            owner: (
                <span className="text-center">
                    Đền cọc 30% <br /> (Đánh giá hệ thống 3*)
                </span>
            ),
        },
        {
            stt: 3,

            title: "Trong Vòng 7 Ngày Trước Chuyến Đi",
            customer: "Không hoàn tiền",
            owner: (
                <span className="text-center">
                    Đền cọc 100% <br /> (Đánh giá hệ thống 2*)
                </span>
            ),
        },
    ];
    useEffect(() => {
        const fetchBikeById = async (id) => {
            await getBikeAPI(dispatch, id);
        };
        fetchBikeById(bikeId);
    }, [bikeId]);
    return (
        <>
            <main className="container w-10/12 mx-auto">
                <Header />
                <section className="grid grid-rows-3 grid-flow-col gap-4 items-stretch my-4">
                    <img
                        className="rounded-lg object-cover row-span-3 col-span-3"
                        src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/kia_morning_2017/p/g/2023/02/14/11/8WcRQtQB6Eqd60lcj4PDZQ.jpg"
                        alt="anhto"
                    />
                    <img
                        className="rounded-lg object-cover "
                        src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/kia_morning_2017/p/g/2023/02/14/11/dvar1MQFm4YB5TVOmcdvsA.jpg"
                        alt="anhnho1"
                    />
                    <img
                        className="rounded-lg object-cover "
                        src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/kia_morning_2017/p/g/2023/02/14/11/dvar1MQFm4YB5TVOmcdvsA.jpg"
                        alt="anhnho1"
                    />
                    <img
                        className="rounded-lg object-cover "
                        src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/kia_morning_2017/p/g/2023/02/14/11/dvar1MQFm4YB5TVOmcdvsA.jpg"
                        alt="anhnho1"
                    />
                </section>
                <section className="grid grid-cols-4 gap-4">
                    <article className="col-span-3">
                        <div className="flex justify-between items-center ">
                            <h1 className="text-4xl font-bold">KIA MORNING 2017</h1>
                            <p className="rounded-full border w-10 h-10 flex items-center justify-center cursor-pointer border-gray-400">
                                {true ? <FavoriteBorderIcon /> : <FavoriteIcon />}
                            </p>
                        </div>
                        <div className="mt-4 flex items-center gap-2 ">
                            <span className="text-gray-500 flex items-center">
                                <StarIcon className="text-yellow-300" />
                                <span>5.0</span>
                            </span>
                            <span className="text-gray-500 flex items-center">
                                <LocalShippingIcon className="text-primary" />
                                <span>188 chuyến</span>
                            </span>
                            <span className="text-gray-500">Quận Thủ Đức, Hồ Chí Minh</span>
                        </div>
                        <ul className="flex gap-2 mt-2 pb-8 border-b border-gray-300">
                            <li className="text-[12px] bg-gray-100 p-1 rounded-xl">
                                <span>Tiết kiệm nhiên liệu</span>
                            </li>
                            <li className="text-[12px] bg-gray-100 p-1 rounded-xl">
                                <span>Động cơ êm</span>
                            </li>
                        </ul>
                        <section className="mt-8 pb-8 border-b border-gray-300">
                            <h3 className="text-xl font-semibold mb-4">Đặc điểm</h3>
                        </section>
                        <section className="mt-8 pb-8 border-b border-gray-300">
                            <h3 className="text-xl font-semibold mb-4">Mô tả</h3>
                            <span className="text-gray-500">
                                Xe rất Tiết Kiệm Xăng . bảo dưỡng tốt. Có cảm biến mùi, bảo hiểm 2 chiều, Anh Chị an tâm
                                sử dụng.
                                <br /> ĐẶC BIỆT: Xe Được khử khuẩn Nano sau mỗi lần sử dụng
                            </span>
                        </section>
                        <section className="mt-8 pb-8 border-b border-gray-300">
                            <h3 className="text-xl font-semibold mb-4">Các tiện nghi khác</h3>
                            <ul className="grid grid-cols-4 gap-4">
                                {tags && tags.length > 0
                                    ? tags.map((tag) => {
                                          return <Tag key={tag.id} tag={tag} />;
                                      })
                                    : null}
                            </ul>
                        </section>
                        <section className="mt-8">
                            <h3 className="text-xl font-semibold mb-4">Giấy tờ thuê xe</h3>
                            <div
                                className="px-8 py-3 bg-primary/5 rounded-xl flex flex-col gap-2 relative overflow-hidden 
                            after:absolute after:left-0 after:bg-primary  after:top-0
                            after:w-4 after:h-full"
                            >
                                <p className="flex items-center gap-2 text-sm text-gray-500">
                                    <InfoIcon />
                                    <span>Chọn 1 trong 2 hình thức</span>
                                </p>
                                <p className="flex items-center gap-4 text-lg text-gray-700">
                                    <ContactEmergencyIcon />
                                    <span>GPLX & CCCD gắn chip (đối chiếu)</span>
                                </p>
                                <p className="flex items-center gap-4 text-lg text-gray-700">
                                    <StyleIcon />
                                    <span>GPLX (đối chiếu) & Passport (giữ lại)</span>
                                </p>
                            </div>
                        </section>
                        <section className="mt-8 pb-8">
                            <h3 className="text-xl font-semibold mb-4">Giấy tờ thuê xe</h3>
                            <div
                                className="px-8 py-3 bg-primary/5 rounded-xl flex flex-col gap-2 relative overflow-hidden 
                            after:absolute after:left-0 after:bg-primary  after:top-0
                            after:w-4 after:h-full"
                            >
                                <p className="flex items-center gap-2 text-gray-700">
                                    <span>Miễn thế chấp</span>
                                </p>
                            </div>
                        </section>
                        <section className="mt-8 pb-8">
                            <h3 className="text-xl font-semibold mb-4">Điều khoản</h3>
                            <div
                                className={`text-gray-500 overflow-hidden ${showPolicy ? "h-auto" : "h-24 opacity-40"}`}
                            >
                                <p>Quy định khác:</p>
                                <ul className="list-disc ml-5">
                                    <li>Sử dụng xe đúng mục đích.</li>
                                    <li>Sử dụng xe đúng mục đích.</li>
                                    <li>Sử dụng xe đúng mục đích.</li>
                                    <li>Sử dụng xe đúng mục đích.</li>
                                    <li>Sử dụng xe đúng mục đích.</li>
                                    <li>Sử dụng xe đúng mục đích.</li>
                                    <li>Sử dụng xe đúng mục đích.</li>
                                </ul>
                                <p>Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời !</p>
                            </div>
                            {!showPolicy ? (
                                <p
                                    className="text-green-700 font-bold cursor-pointer"
                                    onClick={() => {
                                        setShowPolicy(true);
                                    }}
                                >
                                    Đọc thêm
                                </p>
                            ) : null}
                        </section>
                        <section className="mt-8 pb-8 border-b border-gray-300">
                            <h3 className="text-xl font-semibold mb-4">Chính sách huỷ chuyến</h3>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <span className="font-semibold">Thời Điểm Hủy Chuyến</span>
                                            </TableCell>
                                            <TableCell align="center">
                                                <span className="font-semibold">Khách Thuê Hủy Chuyến</span>
                                            </TableCell>
                                            <TableCell align="center">
                                                <span className="font-semibold">Chủ Xe Hủy Chuyến</span>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.title}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.title}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <p className="flex flex-col items-center justify-center">
                                                        {row.stt > 2 ? (
                                                            <CancelIcon className="text-primary" />
                                                        ) : (
                                                            <CheckCircleIcon className="text-green-700" />
                                                        )}
                                                        {row.customer}
                                                    </p>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <p className="flex flex-col items-center justify-center">
                                                        {row.stt > 2 ? (
                                                            <CancelIcon className="text-primary" />
                                                        ) : (
                                                            <CheckCircleIcon className="text-green-700" />
                                                        )}
                                                        {row.owner}
                                                    </p>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <ul className="mt-8 text-xs text-gray-400 list-disc ml-5">
                                <li> Khách thuê không nhận xe sẽ không được hoàn cọc</li>
                                <li>Chủ xe không giao xe sẽ đền 100% tiền cọc</li>
                                <li>Tiền cọc sẽ được hoàn trả trong vòng 1-3 ngày làm việc</li>
                            </ul>
                        </section>
                        <section className="mt-8">
                            <h3 className="text-xl font-semibold mb-8">Vị trí xe</h3>
                            <div className="w-full h-[50vh]">
                                <Map location={location} zoomLevel={15} />
                            </div>
                        </section>
                        <section className="mt-8 pb-8 ">
                            <h3 className="text-xl font-semibold mb-4">Chủ xe</h3>
                            <div className="flex justify-between">
                                <div className="flex gap-4">
                                    <img
                                        src="https://n1-cstg.mioto.vn/m/avatars/avatar-1.png"
                                        alt="avatar"
                                        className="w-20 h-20 rounded-full border border-gray-300 object-cover"
                                    />
                                    <div className="flex flex-col gap-1">
                                        <Link to={"/profile/id"} className="text-2xl font-semibold">
                                            Lee Tam
                                        </Link>
                                        <p className="flex gap-2">
                                            <span className="text-gray-500 flex items-center">
                                                <StarIcon className="text-yellow-300" />
                                                <span>5.0</span>
                                            </span>
                                            <span className="text-gray-500 flex items-center">
                                                <LocalShippingIcon className="text-primary" />
                                                <span>188 chuyến</span>
                                            </span>
                                        </p>
                                        <span className="text-sm text-gray-700">
                                            Thông tin liên hệ với chủ xe sẽ được hiển thị sau khi đặt cọc
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="text-center font-bold">
                                        <p className="text-gray-400">Tỉ lệ phản hồi</p>
                                        <p>100%</p>
                                    </div>
                                    <div className="text-center font-bold">
                                        <p className="text-gray-400">Trong vòng 5 phút</p>
                                        <p>100%</p>
                                    </div>
                                    <div className="text-center font-bold">
                                        <p className="text-gray-400">Tỉ lệ đồng ý</p>
                                        <p>100%</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="mt-8 pb-8">
                            <p className="flex gap-2">
                                <span className="text-gray-500 flex items-center">
                                    <StarIcon className="text-yellow-300" />
                                    <span>5.0</span>
                                </span>
                                :<span className="text-gray-700"> 187 đánh giá</span>
                            </p>
                            <ul className="my-8 grid grid-cols-1 gap-4">
                                <Review />
                                <Review />
                                <Review />
                                <Review />
                            </ul>
                            <p className="text-right">
                                <Button size="large" variant="outlined">
                                    Xem thêm
                                </Button>
                            </p>
                        </section>
                    </article>
                    <aside className="col-span-1">
                        <BookForm />
                        <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
                            <h1 className="text-primary font-bold">Phụ phí có thể phát sinh</h1>
                            <ul className="flex items-center flex-col gap-4 mt-4">
                                <li className="text-xs">
                                    <div className="flex items-center gap-1 font-bold">
                                        <InfoIcon fontSize="small" className="text-gray-400" />
                                        <p>Phí vượt giới hạn</p>
                                        <span className="ml-auto">4 000đ/km</span>
                                    </div>
                                    <p className="ml-6 text-left">
                                        Phụ phí phát sinh nếu lộ trình di chuyển vượt quá 300km khi thuê xe 1 ngày
                                    </p>
                                </li>
                                <li className="text-xs">
                                    <div className="flex items-center gap-1 font-bold">
                                        <InfoIcon fontSize="small" className="text-gray-400" />
                                        <p>Phí vượt giới hạn</p>
                                        <span className="ml-auto">4 000đ/km</span>
                                    </div>
                                    <p className="ml-6 text-left">
                                        Phụ phí phát sinh nếu lộ trình di chuyển vượt quá 300km khi thuê xe 1 ngày
                                    </p>
                                </li>
                                <li className="text-xs">
                                    <div className="flex items-center gap-1 font-bold">
                                        <InfoIcon fontSize="small" className="text-gray-400" />
                                        <p>Phí vượt giới hạn</p>
                                        <span className="ml-auto">4 000đ/km</span>
                                    </div>
                                    <p className="ml-6 text-left">
                                        Phụ phí phát sinh nếu lộ trình di chuyển vượt quá 300km khi thuê xe 1 ngày
                                    </p>
                                </li>
                                <li className="text-xs">
                                    <div className="flex items-center gap-1 font-bold">
                                        <InfoIcon fontSize="small" className="text-gray-400" />
                                        <p>Phí vượt giới hạn</p>
                                        <span className="ml-auto">4 000đ/km</span>
                                    </div>
                                    <p className="ml-6 text-left">
                                        Phụ phí phát sinh nếu lộ trình di chuyển vượt quá 300km khi thuê xe 1 ngày
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-4 cursor-pointer hover:text-primary ">
                            <EmojiFlagsIcon />
                            <span>Báo cáo xe này</span>
                        </div>
                    </aside>
                </section>
            </main>
            <section className="mt-8 py-12 bg-gray-100">
                <main className="container w-4/5 mx-auto">
                    <h3 className="text-xl font-semibold mb-4">Xe tương tự</h3>
                    <ul className="grid grid-cols-4 gap-5">
                        {/* <Card />
                        <Card />
                        <Card />
                        <Card /> */}
                    </ul>
                </main>
            </section>
            <Footer />
        </>
    );
}

export default DetailBike;
