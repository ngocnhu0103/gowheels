import { useFormik } from "formik";
import * as Yup from "yup";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import { useEffect } from "react";
import { useSelector } from "react-redux";
function UpdateProfile() {
    const user = useSelector((state) => {
        return state.auth.user;
    });
    const initialValues = {
        email: "fsadafasdfsdf",
        address: "",
        phone: "",
        idCode: "",
        accountNumber: "",
        gender: "",
    };
    const formikUpdate = useFormik({
        initialValues,
        validationSchema: Yup.object({
            accountNumber: Yup.string().trim(),
            address: Yup.string().trim(),
            phone: Yup.string()
                .trim()
                .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Không đúng định dạng"),
            idCode: Yup.string().trim(),
        }),
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
            idCode: Yup.string().trim().required("Vui lòng nhập số căn cước công dân"),
        }),
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("update");
        formikRegister.handleReset(e);
        console.log(formikUpdate.values);
        formikUpdate.handleSubmit(e);
    };
    const handleRegisterOwner = (e) => {
        e.preventDefault();
        console.log("chu xe");
        console.log(formikRegister.values);
        formikRegister.handleSubmit(e);
    };
    useEffect(() => {
        if (user) {
            formikRegister.setValues({
                email: user.email,
                address: user.address,
                accountNumber: user.accountNumber,
                phone: user.phone,
                gender: user.gender,
                idCode: user.idCode,
            });
        }
    }, []);

    return (
        <div>
            <h1 className="text-center text-3xl font-banner text-primary">Thông tin tài khoản</h1>
            <div className="grid grid-cols-5 mt-12 gap-6 items-start">
                <div className="col-span-2 flex gap-5 flex-col justify-center items-center bg-gray-100/90 rounded-xl p-4">
                    <div className="w-40 h-40 rounded-full relative ">
                        <p className="p-2 rounded-full bg-gray-200 absolute bottom-1 right-2 z-10">
                            <CenterFocusWeakIcon />
                        </p>
                        <img
                            className="w-full h-full rounded-full border border-primary"
                            src="https://img.lovepik.com/free_png/32/36/56/33b58PICUzwFf44X2nePV_PIC2018.png_860.png"
                            alt=""
                        />
                    </div>
                    <div className="text-center">
                        <p className="font-medium">Tiết Ngọc Như</p>
                        <p className="text-sm text-gray-500 mt-2">Ngay tham gia: 20/12/2020</p>
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
                            value={formikRegister.values.email}
                            className="flex-1 py-2 px-1 outline-none cursor-not-allowed disabled:text-gray-200"
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
                            value={formikRegister.values.gender}
                            className="flex-1 py-2 px-1 outline-none "
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
                        <span className="text-rose-400 text-xs font-semibold">{formikRegister.errors.address}</span>
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
                        <span className="text-rose-400 text-xs font-semibold">{formikRegister.errors.phone}</span>
                    ) : null}
                    <div className="flex items-center gap-4 ">
                        <label className="w-2/6" htmlFor="">
                            Căn cước công dân
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
                            value={formikRegister.values.idCode}
                            name="idCode"
                            className="flex-1 py-2 px-1 outline-none "
                            type="text"
                        />
                    </div>
                    {formikRegister.touched.idCode && formikRegister.errors.idCode ? (
                        <span className="text-rose-400 text-xs font-semibold">{formikRegister.errors.idCode}</span>
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
                        <button className={`mt-4 text-white bg-primary py-2 px-8 rounded-md `} onClick={handleUpdate}>
                            Cập nhật thông tin
                        </button>
                        <button
                            className={`mt-4 text-primary border-primary border  py-2 px-8 rounded-md `}
                            onClick={handleRegisterOwner}
                        >
                            Đăng ký làm chủ xe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateProfile;
