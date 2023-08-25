import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import Navigation from '../components/profile/Navigation';
function UpdateProfile() {
    return (
        <div>
            <h1 className='text-center text-3xl font-banner text-primary'>Thông tin tài khoản</h1>
            <div className='grid grid-cols-3 mt-12 gap-6'>
                <div className='col-span-2 bg-gray-100/90 rounded-xl p-4'>
                    <img src="https://img.lovepik.com/free_png/32/36/56/33b58PICUzwFf44X2nePV_PIC2018.png_860.png" alt="" className='h-20 w-20' />
                    <p>Tiết Ngọc Như</p>
                </div>
                <div >
                    <p>Ngày sinh</p>
                    <p>Giới tính</p>
                    <p>Địa chỉ</p>
                    <p>Số điện thoại</p>
                    <p>Email</p>
                    <p>Số tài khoản</p>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile