import { Link } from 'react-router-dom'
import srcBg from "../assets/bg.png"
import { Button } from '@mui/material'
function Header() {
    return (
        <header className="h-20 flex items-center justify-between">
            <Link to={'/'}>
                <img src={srcBg} alt="logo" />
            </Link>

            <div className='h-full flex items-center gap-8'>
                <ul className='font-semibold flex gap-8'>
                    <li >
                        <Link to={'/about'}>
                            Giới thiệu
                        </Link>
                    </li>
                    <li>
                        <Link to={'/price'}>
                            Bảng giá
                        </Link>
                    </li>
                </ul>
                <div className='h-1/2 w-[1px] bg-gray-300'></div>
                <div className='flex gap-8'>
                    <Button className='text-primary font-semibold'>Đăng nhập</Button>
                    <Button variant="outlined">Đăng ký</Button>
                </div>
            </div>
        </header>
    );
}

export default Header;