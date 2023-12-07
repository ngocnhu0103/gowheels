import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfileAPI } from "../api/authAPI";
import { getCommentsAPI } from "../api/commentAPI";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import moment from "moment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
// import { Button } from "@mui/material";
import Review from "../components/Review";
import { getBikesAPI } from "../api/bikeAPI";
import RenderByPoint from "../utils/renderByPoint";

const Profile = () => {
    const { userId } = useParams();
    const { comments } = useSelector((state) => state.comment);
    const dispatch = useDispatch();
    const [userProfile, setUserProfile] = useState();
    const [bikes, setBikes] = useState();

    const getProfile = async () => {
        const data = await getProfileAPI(dispatch, Number(userId));
        setUserProfile(data);
    };
    const fetchComments = async (userId) => {
        await getCommentsAPI(dispatch, userId);
    };
    const fetchBikes = async (userId) => {
        const data = await getBikesAPI(dispatch, userId);
        setBikes(data);
    };
    useEffect(() => {
        if (!userId) return;
        getProfile();
        fetchComments(userId);
        fetchBikes(userId);
    }, [userId]);
    const avgs = useMemo(() => {
        return comments.reduce((old, current) => {
            return (old += current?.startNumber);
        }, 0);
    }, [comments]);
    return (
        <main className="container w-4/5 max-md:px-4 max-md:w-full mx-auto relative min-h-screen flex flex-col justify-between">
            <Header />
            <div className="flex flex-col gap-5">
                <section className="p-4 flex bg-gray-100/90">
                    <div className="p-4">
                        <h1 className="text-3xl font-semibold">Thông tin tài khoản</h1>
                        <div className="flex mt-4">
                            <div className="flex items-center gap-2 flex-col">
                                <div className="w-40 h-40 rounded-full relative ">
                                    <img
                                        className="w-full h-full rounded-full border border-primary"
                                        src={
                                            userProfile?.avatar?.url ||
                                            "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="text-center w-fit">
                                    <div className="flex gap-2 items-center justify-center">
                                        <p className="font-medium">{userProfile?.fullName}</p>
                                        {userProfile?.jobber && <CheckCircleIcon color="success" />}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Ngày tham gia: {moment(userProfile?.createdAt).fromNow()}
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 flex flex-col gap-2">
                                <p className="text-semibold text-gray-500 ">
                                    Địa chỉ email: <span className="text-black">{userProfile?.email}</span>
                                </p>
                                <p className="text-semibold text-gray-500 ">
                                    Họ và tên: <span className="text-black">{userProfile?.fullName}</span>
                                </p>
                                <p className="text-semibold text-gray-500 ">
                                    Số điện thoại: <span className="text-black">{userProfile?.phone}</span>
                                </p>
                                {RenderByPoint(userProfile?.point)}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="p-4 bg-gray-100/90">
                    <div className=" flex gap-5 flex-col justify-center w-fit items-center  rounded-xl p-4">
                        <h1 className="text-3xl font-semibold">Danh sách xe</h1>
                        <ul className="grid grid-cols-4 gap-4 max-md:grid-cols-1">
                            {bikes && bikes.length > 0
                                ? bikes.map((bike) => {
                                      return <Card key={bike.bikeId} bike={bike} />;
                                  })
                                : null}
                        </ul>
                    </div>
                </section>
                <section className="p-4 bg-gray-100/90">
                    <div className="col-span-2 flex gap-5 flex-col justify-center w-full rounded-xl p-4">
                        <h1 className="text-3xl font-semibold">Đánh giá</h1>
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
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
};

export default Profile;
