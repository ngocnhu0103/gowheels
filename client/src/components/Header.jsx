import { Link } from 'react-router-dom'
import { Modal } from '@mui/material'
import { useState } from 'react';
import srcBg from "../assets/bg.png"
import FormRegister from './auth/FormRegister';
import FormLogin from './auth/FormLogin';
function Header() {
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    const handleOpenLogin = () => {
        setOpenLogin(true)
    }
    const handleCloseLogin = () => {
        setOpenLogin(false)
    }

    const handleOpenRegister = () => {
        setOpenRegister(true)
    }
    const handleCloseRegister = () => {
        setOpenRegister(false)
    }
    return (
        <header className="h-20 flex items-center justify-between">
            <Link to={'/'}>
                <img src={srcBg} alt="logo" />
            </Link>

            <div className='h-full flex items-center gap-8'>
                <ul className='font-semibold flex gap-8'>
                    <li >
                        <Link to={'/profile/update'}>
                            Đăng ký làm chủ xe
                        </Link>
                    </li>
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
                    <button className='text-primary font-semibold py-2 px-3' onClick={handleOpenLogin}>Đăng nhập</button>
                    <button className='text-primary font-semibold border border-primary py-2 px-3 rounded' onClick={handleOpenRegister}>Đăng ký</button>

                </div>
            </div>
            <Modal
                open={openLogin}
                onClose={handleCloseLogin}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <>
                    <FormLogin />
                </>
            </Modal>
            <Modal
                open={openRegister}
                onClose={handleCloseRegister}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <>
                    <FormRegister />
                </>
            </Modal>
        </header>


    );
}

export default Header;