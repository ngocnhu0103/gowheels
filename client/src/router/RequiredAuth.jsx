import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequiredAuth() {
    const user = useSelector((state) => {
        return state.auth.user;
    });

    if (!user) return <Navigate to={"/"} replace />;

    return <Outlet />;
}

export default RequiredAuth;
