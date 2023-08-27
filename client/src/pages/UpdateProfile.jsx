import { useFormik } from 'formik';
import * as Yup from 'yup';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
function UpdateProfile() {
    const formik = useFormik({
        initialValues: {
            email: "fsadafasdfsdf",
            address: "",
            phone: "",
            idCode: "",
            accountNumber: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().trim().email('email không đúng định dạng').required('Vui lòng nhập email'),
            accountNumber: Yup.string().trim(),
            address: Yup.string().trim(),
            phone: Yup.string().trim().length(10, "Mật khẩu phải là 10 ký tự").required('Vui lòng nhập số điện thoại'),
            idCode: Yup.string().trim().required('Vui lòng nhập mật khẩu')
        })
    })
    const handleUpdate = (e) => {
        e.preventDefault()
        console.log("updaate");
        formik.validateForm()

        formik.handleSubmit(e)

    }
    const handleRegisterOwner = (e) => {
        e.preventDefault()
        console.log("chu xe");
        console.log(e);
    }
    return (
        <div>
            <h1 className='text-center text-3xl font-banner text-primary'>Thông tin tài khoản</h1>
            <div className='grid grid-cols-5 mt-12 gap-6'>
                <div className='col-span-2 flex gap-5 flex-col justify-center items-center bg-gray-100/90 rounded-xl p-4'>
                    <div className='w-40 h-40 rounded-full relative '>
                        <p className='p-2 rounded-full bg-gray-200 absolute bottom-1 right-2 z-10'><CenterFocusWeakIcon /></p>
                        <img className='w-full h-full rounded-full border border-primary' src="https://img.lovepik.com/free_png/32/36/56/33b58PICUzwFf44X2nePV_PIC2018.png_860.png" alt="" />
                    </div>
                    <div className='text-center'>
                        <p className='font-medium'>Tiết Ngọc Như</p>
                        <p className='text-sm text-gray-500 mt-2'>Ngay tham gia: 20/12/2020</p></div>
                </div>

                <form className="flex flex-col col-span-3 gap-5">
                    <div className='flex items-center gap-4 '>
                        <label className='w-2/6' htmlFor="">Ngày sinh</label>
                        <input className='flex-1 py-2 px-1 outline-none ' type="text" />
                    </div>
                    <div className='flex items-center gap-4 '>
                        <label className='w-2/6' htmlFor="">Email</label>
                        <input disabled value={formik.values.email} className='flex-1 py-2 px-1 outline-none cursor-not-allowed disabled:text-gray-200' type="text" />
                    </div>
                    <div className='flex items-center gap-4 '>
                        <label className='w-2/6' htmlFor="">Địa chỉ</label>
                        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='flex-1 py-2 px-1 outline-none ' type="text" />

                    </div>
                    {formik.touched.phone && formik.errors.phone ? (
                        <span className="text-rose-400 text-xs font-semibold">
                            {formik.errors.phone}
                        </span>
                    ) : null}
                    <div className='flex items-center gap-4 '>
                        <label className='w-2/6' htmlFor="">Số điện thoại</label>
                        <input className='flex-1 py-2 px-1 outline-none ' type="text" />
                    </div>
                    <div className='flex items-center gap-4 '>
                        <label className='w-2/6' htmlFor="">Căn cước công dân</label>
                        <input className='flex-1 py-2 px-1 outline-none ' type="text" />
                    </div>
                    <div className='flex items-center gap-4 '>
                        <label className='w-2/6' htmlFor="">Số tài khoản</label>
                        <input className='flex-1 py-2 px-1 outline-none ' type="text" />
                    </div>




                    <div className='flex justify-between'>
                        <button className={`mt-4 text-white bg-primary py-2 px-8 rounded-md `} onClick={handleUpdate}>
                            Cập nhật thông tin
                        </button>
                        <button className={`mt-4 text-primary border-primary border  py-2 px-8 rounded-md `} onClick={handleRegisterOwner}>
                            Đăng ký làm chủ xe
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default UpdateProfile