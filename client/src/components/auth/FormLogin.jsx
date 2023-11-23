import { FormControl, Input, InputLabel } from "@mui/material";
import { loginAPI } from "../../api/authAPI";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function FormLogin({ onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = await loginAPI(dispatch, { email, password });
        setLoading(false);
        onClose();
        if (data.user.role === "ADMIN") {
            navigate("/admin");
        }
    };

    return (
        <div className="w-1/4 mx-auto mt-24 bg-white p-4 rounded-xl">
            <h1 className="text-3xl font-bold text-center text-primary py-4">Đăng nhập</h1>
            <form className="flex flex-col" onSubmit={handleLogin}>
                <FormControl margin="dense">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className="text-white"
                        type="email"
                        id="email"
                        required
                    />
                </FormControl>

                <FormControl margin="dense">
                    <InputLabel htmlFor="password">Mật khẩu</InputLabel>
                    <Input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        id="password"
                        type="password"
                        required
                    />
                </FormControl>

                <button
                    disabled={loading}
                    className={`mt-4 text-white bg-primary py-2 rounded-md ${loading && "disabled:bg-primary/20"}`}
                >
                    {loading ? "Chờ trong giây lát......" : "Đăng nhập"}
                </button>
            </form>
        </div>
    );
}

export default FormLogin;
