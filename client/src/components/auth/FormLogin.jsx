import { FormControl, FormHelperText, Input, InputLabel, } from "@mui/material";

function FormLogin() {
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(e);
    }
    return (
        <div className="w-1/4 mx-auto mt-24 bg-white p-4 rounded-xl">
            <h1 className="text-3xl font-bold text-center text-primary py-4">Đăng nhập</h1>
            <form className="flex flex-col">
                <FormControl margin="dense">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input className="text-white" type="email" id="email" ariaDescribedby="email-helper" />
                    <FormHelperText id="email-helper">Vui lòng nhập email.</FormHelperText>
                </FormControl>

                <FormControl margin="dense">
                    <InputLabel htmlFor="password">Mật khẩu</InputLabel>
                    <Input id="password" type="password" ariaDescribedby="password-helper" />
                    <FormHelperText id="password-helper">Vui lòng nhập mật khẩu.</FormHelperText>
                </FormControl>


                <button className="mt-4 text-white bg-primary py-2 rounded-md" onClick={handleLogin}>
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}

export default FormLogin;