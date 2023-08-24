import React from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CommuteIcon from '@mui/icons-material/Commute';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
function Navigation() {
    return (
        <div className=''>
            <h1>Xin chào</h1>
            <ul>
                <li >
                    <Link to={'/profile/update'}>
                        <AccountCircleIcon />
                        <span>Tài khoản của tôi</span>
                    </Link>
                </li>
                <li >
                    <Link to={'/profile/favs'}>
                        <FavoriteBorderIcon />
                        <span>Xe yêu thích</span>
                    </Link>
                </li>
                <li >
                    <Link to={'/profile/mystranport'}>
                        <TimeToLeaveIcon />
                        <span>Xe của tôi</span>
                    </Link>
                </li>
                <li >
                    <Link to={'/profile/order'}>
                        <ListAltIcon />
                        <span>Quản lý đơn hàng</span>
                    </Link>
                </li>
                <li >
                    <Link to={'/profile/myorder'}>
                        <CommuteIcon />
                        <span>Đơn hàng của tôi</span>
                    </Link>
                </li>
                <li >
                    <Link to={'/profile/logout'}>
                        <ExitToAppIcon />
                        <span>Đăng xuất</span>
                    </Link>
                </li>
                <li >
                    <Link to={'/profile/deleteaccount'}>
                        <DeleteOutlineIcon />
                        <span>Yêu cầu xóa tài khoản</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navigation