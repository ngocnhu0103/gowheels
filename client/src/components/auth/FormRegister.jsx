import { FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerAPI } from "../../api/authAPI";
function FormRegister({ onClose, openComfirm }) {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const handleRegister = async (values) => {
        setLoading(true);
        const status = await registerAPI(dispatch, values);
        setLoading(false);
        onClose();
        if (status === 200) {
            openComfirm();
        }
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            fullName: "",
            password: "",
            gender: "",
            repeatPassword: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().trim().email("email không đúng định dạng").required("Vui lòng nhập email"),
            fullName: Yup.string().trim().required("Vui lòng nhập tên hiển thị"),
            gender: Yup.string().required("Vui lòng chọn giới tính").oneOf(["Nữ", "Nam"]),
            password: Yup.string().trim().min(4, "Mật khẩu phải ít nhất 4 ký tự").required("Vui lòng nhập mật khẩu"),
            repeatPassword: Yup.string()
                .trim()
                .required("Vui lòng nhập mật khẩu")
                .oneOf([Yup.ref("password")], "Mật khẩu không khớp"),
        }),
        onSubmit: (values) => {
            handleRegister(values);
        },
    });
    return (
        <div className="w-1/4 max-md:w-11/12 mx-auto mt-24 bg-white p-4 rounded-xl animate-jump-in">
            <h1 className="text-3xl font-bold text-center text-primary py-4">Đăng ký</h1>
            <form className="flex flex-col" onSubmit={formik.handleSubmit}>
                <FormControl margin="dense">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="text-white"
                        name="email"
                        type="text"
                        id="email"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <span className="text-rose-400 text-xs font-semibold">{formik.errors.email}</span>
                    ) : null}
                </FormControl>
                <FormControl margin="dense">
                    <InputLabel htmlFor="fullName">Tên hiển thị</InputLabel>
                    <Input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                        name="fullName"
                        id="fullName"
                    />
                    {formik.touched.fullName && formik.errors.fullName ? (
                        <span className="text-rose-400 text-xs font-semibold">{formik.errors.fullName}</span>
                    ) : null}
                </FormControl>
                <FormControl margin="dense">
                    <InputLabel htmlFor="password">Mật khẩu</InputLabel>
                    <Input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        name="password"
                        id="password"
                        type="password"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <span className="text-rose-400 text-xs font-semibold">{formik.errors.password}</span>
                    ) : null}
                </FormControl>
                <FormControl margin="dense">
                    <InputLabel htmlFor="repeatPassword">Nhập lại mật khẩu</InputLabel>
                    <Input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.repeatPassword}
                        name="repeatPassword"
                        id="repeatPassword"
                        type="password"
                    />
                    {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
                        <span className="text-rose-400 text-xs font-semibold">{formik.errors.repeatPassword}</span>
                    ) : null}
                </FormControl>
                <FormControl margin="dense">
                    <InputLabel htmlFor="fullName">Giới tính</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="gender"
                        value={formik.values.gender}
                        label="gender"
                        onChange={formik.handleChange}
                    >
                        <MenuItem value={"Nữ"}>Nữ</MenuItem>
                        <MenuItem value={"Nam"}>Nam</MenuItem>
                    </Select>
                    {formik.touched.gender && formik.errors.gender ? (
                        <span className="text-rose-400 text-xs font-semibold">{formik.errors.gender}</span>
                    ) : null}
                </FormControl>
                <button
                    disabled={loading}
                    className={`mt-4 text-white bg-primary py-2 rounded-md ${loading && "disabled:bg-primary/20"}`}
                >
                    {loading ? "Chờ trong giây lát......" : "Đăng ký"}
                </button>
            </form>
        </div>
    );
}

export default FormRegister;
