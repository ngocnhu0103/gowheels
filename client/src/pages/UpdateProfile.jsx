import { useFormik } from "formik";
import * as Yup from "yup";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Navigation from "../components/profile/Navigation";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import moment from "moment";
import { Modal } from "@mui/material";
import UploadImage from "../components/auth/UploadImage";
import { reSendOtpAPI, registerOwnerAPI, updateInfoAPI, uploadAvatarAPI } from "../api/authAPI";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FormComfirm from "../components/auth/FormComfirm";
import ComfirmModal from "../components/modal/ComfirmModal";
function UpdateProfile() {
    const location = useLocation();
    const activeName = location.pathname.split("/")[location.pathname.split("/").length - 1];
    const user = useSelector((state) => {
        return state.auth.user;
    });
    const [isShowUpload, setIsShowUpload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [avt, setAvt] = useState(null);
    const dispatch = useDispatch();
    const initialValues = {
        address: "",
        phone: "",
        accountNumber: "",
    };
    const formikUpdate = useFormik({
        initialValues,
        validationSchema: Yup.object({
            accountNumber: Yup.string().trim(),
            address: Yup.string().trim(),
            phone: Yup.string()
                .trim()
                .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Không đúng định dạng"),
        }),
        onSubmit: async (values) => {
            console.log(values);
            // call api
            setLoading(true);
            await updateInfoAPI(dispatch, values);
            setLoading(false);
        },
    });
    const formikRegister = useFormik({
        initialValues,
        validationSchema: Yup.object({
            accountNumber: Yup.string().trim().required("Vui lòng nhập số tài khoản"),
            address: Yup.string().trim().required("Vui lòng nhập địa chỉ"),
            phone: Yup.string()
                .trim()
                .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Không đúng định dạng")
                .required("Vui lòng nhập số điện thoại"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            await registerOwnerAPI(dispatch, values);
            setLoading(false);
        },
    });

    const [isComfirm, setIsComfirm] = useState(false);
    const openComfirm = () => {
        setIsComfirm(true);
    };
    const closeComfirm = () => {
        setIsComfirm(false);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        formikUpdate.handleSubmit(e);
    };
    const handleRegisterOwner = async (e) => {
        e.preventDefault();
        if (user.enabled) {
            formikRegister.handleSubmit(e);
        } else {
            setLoading(true);
            await reSendOtpAPI(dispatch);
            setLoading(false);
            openComfirm();
        }
    };
    useEffect(() => {
        if (user) {
            formikRegister.setValues({
                address: user.address || "",
                accountNumber: user.accountNumber || "",
                phone: user.phone || "",
            });
            formikUpdate.setValues({
                address: user.address || "",
                accountNumber: user.accountNumber || "",
                phone: user.phone || "",
            });
        }
    }, []);
    const handleUpload = async () => {
        await uploadAvatarAPI(dispatch, { url: avt });
    };
    console.log(user);
    return (
        <main className="container w-4/5 mx-auto ">
            <Header />

            <section className="grid grid-cols-3 mt-12 gap-6">
                <Navigation activeName={activeName}></Navigation>
                <div className="col-span-2  rounded-xl p-4">
                    <div>
                        <h1 className="text-center text-3xl font-banner text-primary">Thông tin tài khoản</h1>
                        <div className="grid grid-cols-5 mt-12 gap-6 items-start">
                            <div className="col-span-2 flex gap-5 flex-col justify-center items-center bg-gray-100/90 rounded-xl p-4">
                                <div className="w-40 h-40 rounded-full relative ">
                                    <p
                                        onClick={() => {
                                            setIsShowUpload(true);
                                        }}
                                        className="p-2 rounded-full bg-gray-200 absolute bottom-1 right-2 z-10 cursor-pointer"
                                    >
                                        <CenterFocusWeakIcon />
                                    </p>
                                    <img
                                        className="w-full h-full rounded-full border border-primary"
                                        src={
                                            user?.avatar?.url ||
                                            "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                                        }
                                        alt=""
                                    />
                                </div>
                                {
                                    <Modal
                                        open={isShowUpload}
                                        onClose={() => {
                                            setIsShowUpload(false);
                                        }}
                                        aria-labelledby="parent-modal-title"
                                        aria-describedby="parent-modal-description"
                                    >
                                        <>
                                            <UploadImage
                                                avt={avt}
                                                setAvt={setAvt}
                                                handleUpload={handleUpload}
                                                onClose={() => {
                                                    setIsShowUpload(false);
                                                }}
                                            />
                                        </>
                                    </Modal>
                                }
                                <div className="text-center">
                                    <div className="flex gap-2 items-center justify-center">
                                        <p className="font-medium">{user.fullName}</p>
                                        {user.jobber && <CheckCircleIcon color="success" />}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Ngày tham gia: {moment(user.createdAt).fromNow()}
                                    </p>
                                </div>
                            </div>

                            <form className="flex flex-col col-span-3 gap-5">
                                <div className="flex items-center gap-4 ">
                                    <label className="w-2/6" htmlFor="">
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        disabled
                                        value={user.email}
                                        className="flex-1 py-2 px-1 outline-none cursor-not-allowed disabled:text-gray-400"
                                        type="text"
                                    />
                                </div>
                                <div className="flex items-center gap-4 ">
                                    <label className="w-2/6" htmlFor="">
                                        Giới tính
                                    </label>
                                    <input
                                        name="gender"
                                        disabled
                                        value={user.gender}
                                        className="flex-1 py-2 px-1 outline-none cursor-not-allowed disabled:text-gray-400"
                                        type="text"
                                    />
                                </div>
                                <div className="flex items-center gap-4 ">
                                    <label className="w-2/6" htmlFor="address">
                                        Địa chỉ
                                    </label>
                                    <input
                                        onBlur={(e) => {
                                            formikUpdate.handleBlur(e);
                                            formikRegister.handleBlur(e);
                                        }}
                                        onChange={(e) => {
                                            formikUpdate.handleChange(e);
                                            formikRegister.handleChange(e);
                                        }}
                                        value={formikRegister.values.address}
                                        className="flex-1 py-2 px-1 outline-none "
                                        name="address"
                                        type="text"
                                    />
                                </div>
                                {formikRegister.touched.address && formikRegister.errors.address ? (
                                    <span className="text-rose-400 text-xs font-semibold">
                                        {formikRegister.errors.address}
                                    </span>
                                ) : null}
                                <div className="flex items-center gap-4 ">
                                    <label className="w-2/6" htmlFor="phone">
                                        Số điện thoại
                                    </label>
                                    <input
                                        onBlur={(e) => {
                                            formikUpdate.handleBlur(e);
                                            formikRegister.handleBlur(e);
                                        }}
                                        onChange={(e) => {
                                            formikUpdate.handleChange(e);
                                            formikRegister.handleChange(e);
                                        }}
                                        value={formikRegister.values.phone}
                                        name="phone"
                                        className="flex-1 py-2 px-1 outline-none "
                                        type="text"
                                    />
                                </div>
                                {formikRegister.touched.phone && formikRegister.errors.phone ? (
                                    <span className="text-rose-400 text-xs font-semibold">
                                        {formikRegister.errors.phone}
                                    </span>
                                ) : null}
                                <div className="flex items-center gap-4 ">
                                    <label className="w-2/6" htmlFor="">
                                        Số tài khoản
                                    </label>
                                    <input
                                        onBlur={(e) => {
                                            formikUpdate.handleBlur(e);
                                            formikRegister.handleBlur(e);
                                        }}
                                        onChange={(e) => {
                                            formikUpdate.handleChange(e);
                                            formikRegister.handleChange(e);
                                        }}
                                        value={formikRegister.values.accountNumber}
                                        name="accountNumber"
                                        className="flex-1 py-2 px-1 outline-none "
                                        type="text"
                                    />
                                </div>
                                {formikRegister.touched.accountNumber && formikRegister.errors.accountNumber ? (
                                    <span className="text-rose-400 text-xs font-semibold">
                                        {formikRegister.errors.accountNumber}
                                    </span>
                                ) : null}

                                <div className="flex justify-between">
                                    <button
                                        type="submit"
                                        className={`mt-4 text-white bg-primary py-2 px-8 rounded-md disabled:bg-gray-300`}
                                        onClick={handleUpdate}
                                        disabled={loading}
                                    >
                                        {loading ? "loading..." : "Cập nhật thông tin"}
                                    </button>
                                    <button
                                        className={`mt-4 text-primary border-primary border  py-2 px-8 rounded-md disabled:text-gray-300 disabled:border-gray-300`}
                                        onClick={handleRegisterOwner}
                                        disabled={loading}
                                    >
                                        {loading ? "loading..." : "Đăng ký làm chủ xe"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {
                    <Modal
                        open={isComfirm}
                        onClose={closeComfirm}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <>
                            <FormComfirm onClose={closeComfirm} user={user} />
                        </>
                    </Modal>
                }
            </section>
            <Footer />
        </main>
    );
}

export default UpdateProfile;
