import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import Navigation from '../components/profile/Navigation';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import { FormControl, Input, InputLabel } from '@mui/material';
function UpdateProfile() {
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
                        <input className='flex-1 py-2 px-1 outline-none ' type="text" />
                    </div>
                    <div className='flex items-center gap-4 '>
                        <label className='w-2/6' htmlFor="">Địa chỉ</label>
                        <input className='flex-1 py-2 px-1 outline-none ' type="text" />
                    </div>
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




                    <button className={`mt-4 text-white bg-primary py-2 rounded-md `}>
                        Cập nhật thông tin
                    </button>
                </form>

            </div>
        </div>
    )
}

export default UpdateProfile