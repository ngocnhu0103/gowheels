import { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Tag from "../components/Tag";

import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import StyleIcon from "@mui/icons-material/Style";
import Map from "../components/Map";
// import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBikeAPI, similarBikeAPI } from "../api/bikeAPI";
import { getCommentsAPI } from "../api/commentAPI";
import Card from "../components/Card";
import Review from "../components/Review";
import BookForm from "../components/form/BookForm";
import { userLiked } from "../utils/userLiked";
function DetailBike() {
    const [showPolicy, setShowPolicy] = useState(false);
    const [bikesSimilar, setBikesSimilar] = useState([]);

    const { bikeId } = useParams();
    const dispatch = useDispatch();
    const { comments } = useSelector((state) => state.comment);
    const { bike } = useSelector((state) => state.bike);
    const { user } = useSelector((state) => state.auth);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const fetchBikeById = async (id) => {
            await getBikeAPI(dispatch, id);
        };

        bike.id !== bikeId ? fetchBikeById(bikeId) : null;
    }, [bikeId]);

    useEffect(() => {
        const fetchComments = async (userId) => {
            await getCommentsAPI(dispatch, userId);
        };
        const fetchSimilar = async (bike) => {
            const tagList = [...bike.tagList].map((tag) => tag.tagId);
            console.log(bike);
            const data = await similarBikeAPI({
                categoryName: bike.category.categoryName,
                color: bike.color,
                city: bike.city,
                tagIds: tagList.length > 0 ? tagList.join(",") : tagList,
                bikeId: bike.bikeId,
            });
            setBikesSimilar(data);
            console.log(data);
        };
        if (bike) {
            bike.place &&
                setLocation({
                    address: bike.place,
                    lat: bike.lat,
                    lng: bike.lng,
                });
            bike.owner && fetchComments(bike.owner.id);
        }
        console.log("------similar---------");
        bike && fetchSimilar(bike);
    }, [bike]);
    const avgs = useMemo(() => {
        return comments.reduce((old, current) => {
            return (old += current?.startNumber);
        }, 0);
    }, [comments]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth",
                },
                0
            );
        }
    }, [bikeId]);
    return (
        <>
            <main className="container w-10/12 mx-auto">
                <Header />
                <section className="grid grid-rows-3 grid-flow-col gap-4 items-stretch my-4 h-full max-h-[678px]">
                    {bike.images && bike.images.length > 0
                        ? bike.images.map((img, index) => {
                              return (
                                  <img
                                      key={img.imgId}
                                      className={`${
                                          index == 0 && "row-span-3 col-span-3"
                                      } rounded-lg object-cover w-full h-full `}
                                      src={img.url}
                                      alt="anhto"
                                  />
                              );
                          })
                        : null}
                </section>
                <section className="grid grid-cols-4 gap-4">
                    <article className="col-span-3">
                        <div className="flex justify-between items-center ">
                            <h1 className="text-4xl font-bold">{bike.bikeName}</h1>
                            {user && (
                                <p className="rounded-full border w-10 h-10 flex items-center justify-center cursor-pointer text-red-500 border-gray-400">
                                    {userLiked(user.likes, bike.bikeId) ? <FavoriteBorderIcon /> : <FavoriteIcon />}
                                </p>
                            )}
                        </div>
                        <div className="mt-4 flex items-center gap-2 ">
                            <span className="text-gray-500 flex items-center">
                                <StarIcon className="text-yellow-300" />
                                <span>{comments && comments.length && avgs / comments.length}</span>
                            </span>

                            <span className="text-gray-500">{bike.place}</span>
                        </div>
                        <section className="mt-8 pb-8 border-b border-gray-300">
                            <h3 className="text-xl font-semibold mb-4">Mô tả</h3>
                            <span className="text-gray-500">{bike.description}</span>
                        </section>
                        <section className="mt-8 pb-8 border-b border-gray-300">
                            <h3 className="text-xl font-semibold mb-4">Các tiện nghi khác</h3>
                            <ul className="grid grid-cols-4 gap-4">
                                {bike.tagList && bike.tagList.length > 0
                                    ? bike.tagList.map((tag) => {
                                          return <Tag key={tag.tagId} tag={tag} />;
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
                        {/* <section className="mt-8 pb-8 border-b border-gray-300">
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
                        </section> */}
                        <section className="mt-8">
                            <h3 className="text-xl font-semibold mb-8">Vị trí xe</h3>
                            <div className="w-full h-[50vh]  ">
                                {!!location && <Map location={location} zoomLevel={15} />}
                            </div>
                        </section>
                        <section className="mt-8 pb-8 ">
                            <h3 className="text-xl font-semibold mb-4">Chủ xe</h3>
                            <div className="flex justify-between">
                                <div className="flex gap-4">
                                    <img
                                        src={bike.owner?.avatar.url}
                                        alt="avatar"
                                        className="w-20 h-20 rounded-full border border-gray-300 object-cover"
                                    />
                                    <div className="flex flex-col gap-1">
                                        <Link to={`/profile/${bike.owner?.id}`} className="text-2xl font-semibold">
                                            {bike.owner?.fullName}
                                        </Link>
                                        <p className="flex gap-2">
                                            <span className="text-gray-500 flex items-center">
                                                <StarIcon className="text-yellow-300" />
                                                <span>{comments && comments.length && avgs / comments.length}</span>
                                            </span>
                                        </p>
                                        <span className="text-sm text-gray-700">{bike.owner?.email}</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="mt-8 pb-8">
                            <p className="flex gap-2">
                                <span className="text-gray-500 flex items-center">
                                    <StarIcon className="text-yellow-300" />
                                    <span>{comments && comments.length && avgs / comments.length}</span>
                                </span>
                                :<span className="text-gray-700"> {comments.length} đánh giá</span>
                            </p>
                            <ul className="my-8 grid grid-cols-1 gap-4">
                                {comments && comments.length > 0 ? (
                                    comments.map((value) => {
                                        return <Review key={value.id} review={value} />;
                                    })
                                ) : (
                                    <p className="text-xl font-semibold text-yellow-300">Chưa có đánh giá nào!</p>
                                )}
                            </ul>
                            {/* <p className="text-right">
                                <Button size="large" variant="outlined">
                                    Xem thêm
                                </Button>
                            </p> */}
                        </section>
                    </article>
                    <aside className="col-span-1">
                        <BookForm price={bike.price} place={bike.place} bike={bike} />
                        <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
                            <h1 className="text-primary font-bold">Phụ phí có thể phát sinh</h1>
                            <ul className="flex items-center flex-col gap-4 mt-4">
                                <li className="text-xs">
                                    <div className="flex items-center gap-1 font-bold">
                                        <InfoIcon fontSize="small" className="text-gray-400" />
                                        <p>Phí phụ thu</p>
                                    </div>
                                    <p className="ml-6 text-left">
                                        Phụ phí phát sinh nếu quý khách vượt quá ngày thuê xe, xe có hư hỏng... mọi vấn
                                        đề sẽ được giải quyết bằng sự thỏa thuận giữa 2 bên cho thuê và người thuê.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </section>
            </main>
            <section className="mt-8 py-12 bg-gray-100">
                <main className="container w-4/5 mx-auto">
                    <h3 className="text-xl font-semibold mb-4">Xe tương tự</h3>
                    <ul className="grid grid-cols-4 gap-5">
                        {bikesSimilar && bikesSimilar.similar1
                            ? bikesSimilar.similar1.map((item) => {
                                  return <Card bike={item} key={`similar${item.bikeId}`} />;
                              })
                            : null}
                        {bikesSimilar && bikesSimilar.similar2
                            ? bikesSimilar.similar2.map((item) => {
                                  if (!bikesSimilar.similar1.some((item1) => item1.bikeId === item.bikeId)) {
                                      return <Card bike={item} key={`similar2${item.bikeId}`} />;
                                  }
                              })
                            : null}
                        {bikesSimilar && bikesSimilar.similar3
                            ? bikesSimilar.similar3.map((item) => {
                                  if (!bikesSimilar.similar2.some((item2) => item2.bikeId === item.bikeId)) {
                                      return <Card bike={item} key={`similar3${item.bikeId}`} />;
                                  }
                              })
                            : null}
                    </ul>
                </main>
            </section>
            <Footer />
        </>
    );
}

export default DetailBike;
