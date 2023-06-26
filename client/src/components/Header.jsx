import { Link } from 'react-router-dom'
import srcBg from "../assets/bg.png"
import { Button, Modal } from '@mui/material'
import { useState } from 'react';
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
                    <Button className='text-primary font-semibold' onClick={handleOpenLogin}>Đăng nhập</Button>
                    <Button variant="outlined" onClick={handleOpenRegister}>Đăng ký</Button>

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