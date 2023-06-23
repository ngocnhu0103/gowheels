import { FormControl, FormHelperText, Input, InputLabel, } from "@mui/material";

function FormRegister() {
    const handleRegister = (e) => {
        e.preventDefault();
        console.log(e);
    }
    return (
        <div className="w-1/4 mx-auto mt-24 bg-white p-4 rounded-xl">
            <h1 className="text-3xl font-bold text-center text-primary py-4">Đăng ký</h1>
            <form className="flex flex-col">
                <FormControl margin="dense">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input className="text-white" type="email" id="email" ariaDescribedby="email-helper" />
                    <FormHelperText id="email-helper">Vui lòng nhập email.</FormHelperText>
                </FormControl>
                <FormControl margin="dense">
                    <InputLabel htmlFor="fullName">Tên hiển thị</InputLabel>
                    <Input id="fullName" ariaDescribedby="full-name-helper" />
                    <FormHelperText id="full-name-helper">Vui lòng nhập tên hiển thị.</FormHelperText>
                </FormControl>
                <FormControl margin="dense">
                    <InputLabel htmlFor="password">Mật khẩu</InputLabel>
                    <Input id="password" type="password" ariaDescribedby="password-helper" />
                    <FormHelperText id="password-helper">Vui lòng nhập mật khẩu.</FormHelperText>
                </FormControl>
                <FormControl margin="dense">
                    <InputLabel htmlFor="repeatPassword">Nhập lại mật khẩu</InputLabel>
                    <Input id="repeatPassword" type="password" ariaDescribedby="repeat-password-helper" />
                    <FormHelperText id="repeat-password-helper">Vui lòng nhập lại mật khẩu.</FormHelperText>
                </FormControl>

                <button className="mt-4 text-white bg-primary py-2 rounded-md" onClick={handleRegister}>
                    Đăng ký
                </button>
            </form>
        </div>
    );
}

export default FormRegister;