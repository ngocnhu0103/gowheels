import React from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CommuteIcon from '@mui/icons-material/Commute';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
function Navigation({ activeName }) {
    return (
        <div className='bg-gray-100/90 p-4 rounded-xl'>
            <h1 className='text-primary text-3xl font-banner mb-4 '>Xin chào bạn!</h1>
            <ul>
                <li className={`hover:bg-white p-4 border-b font-medium text-lg ${activeName === "update" ? "text-primary" : ""}`} >
                    <Link className='flex items-center gap-4' to={'/profile/update'}>
                        <AccountCircleIcon />
                        <span>Tài khoản của tôi</span>
                    </Link>
                </li>
                <li className={`hover:bg-white p-4 border-b font-medium text-lg ${activeName === "favs" ? "text-primary" : ""}`}>
                    <Link className='flex items-center gap-4' to={'/profile/favs'}>
                        <FavoriteBorderIcon />
                        <span>Xe yêu thích</span>
                    </Link>
                </li>
                <li className={`hover:bg-white p-4 border-b font-medium text-lg ${activeName === "mystranport" ? "text-primary" : ""}`}>
                    <Link className='flex items-center gap-4' to={'/profile/mystranport'}>
                        <TimeToLeaveIcon />
                        <span>Xe của tôi</span>
                    </Link>
                </li>
                <li className={`hover:bg-white p-4 border-b font-medium text-lg ${activeName === "order" ? "text-primary" : ""}`}>
                    <Link className='flex items-center gap-4' to={'/profile/order'}>
                        <ListAltIcon />
                        <span>Quản lý đơn hàng</span>
                    </Link>
                </li>
                <li className={`hover:bg-white p-4 border-b font-medium text-lg ${activeName === "myorder" ? "text-primary" : ""}`}>
                    <Link className='flex items-center gap-4' to={'/profile/myorder'}>
                        <CommuteIcon />
                        <span>Đơn hàng của tôi</span>
                    </Link>
                </li>
                <li className={`hover:bg-white p-4 border-b font-medium text-lg ${activeName === "logout" ? "text-primary" : ""}`}>
                    <Link className='flex items-center gap-4' to={'/profile/logout'}>
                        <ExitToAppIcon />
                        <span>Đăng xuất</span>
                    </Link>
                </li>
                <li className='hover:bg-white p-4 font-medium text-lg'>
                    <Link className='flex items-center gap-4' to={'/profile/deleteaccount'}>
                        <DeleteOutlineIcon />
                        <span>Yêu cầu xóa tài khoản</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navigation