import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminRouter() {
    const user = useSelector((state) => {
        return state.auth.user;
    });

    if (user.role !== "ADMIN") return <Navigate to={"/unauthorized"} replace />;

    return <Outlet />;
}

export default AdminRouter;
