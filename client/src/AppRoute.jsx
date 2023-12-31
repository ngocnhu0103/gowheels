import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import UpdateProfile from "./pages/UpdateProfile";
import BikeFavs from "./pages/BikeFavs";
import MyStranport from "./pages/MyStranport";
import MyOrder from "./pages/MyOrder";
import Order from "./pages/Order";
import Analyst from "./pages/Analyst";
import RequiredAuth from "./router/RequiredAuth";
import BikeRegister from "./pages/BikeRegister";
import DetailBike from "./pages/DetailBike";
import NotFound from "./pages/NotFound";
import BikePage from "./pages/BikePage";
import MyOrderDetail from "./pages/MyOrderDetail";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentFailure from "./pages/payment/PaymentFailure";
import PaymentSuccessEnd from "./pages/payment/PaymentSuccessEnd";
import PaymentFailureEnd from "./pages/payment/PaymentFailureEnd";
import OrderDetail from "./pages/OrderDetail";
import Profile from "./pages/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import ReportManagement from "./pages/dashboard/ReportManagement";
import AdminRouter from "./router/AdminRouter";
import Unauthorized from "./pages/Unauthorized";
import EditBike from "./pages/EditBike";

function AppRoute() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />}></Route>
            <Route element={<RequiredAuth />}>
                <Route index path="/profile/update" element={<UpdateProfile />}></Route>
                <Route path="/profile/favs" element={<BikeFavs />}></Route>
                <Route path="/profile/mystranport" element={<MyStranport />}></Route>
                <Route path="/profile/order" element={<Order />}></Route>
                <Route path="/profile/myorder" element={<MyOrder />}></Route>
                <Route path="/profile/myorder/:bookId" element={<MyOrderDetail />}></Route>
                <Route path="/profile/order/:bookId" element={<OrderDetail />}></Route>
                <Route path="/profile/analyst" element={<Analyst />}></Route>
                <Route path="/bikeregister" element={<BikeRegister />}></Route>
                <Route path="/edit/:bikeId/bike" element={<EditBike />}></Route>
                <Route path="/success" element={<PaymentSuccess />}></Route>
                <Route path="/failure" element={<PaymentFailure />}></Route>
                <Route path="/success/end" element={<PaymentSuccessEnd />}></Route>
                <Route path="/failure/end" element={<PaymentFailureEnd />}></Route>

                <Route element={<AdminRouter />}>
                    <Route path="/admin" element={<Dashboard />}>
                        <Route path="/admin/report" element={<ReportManagement />}></Route>
                    </Route>
                </Route>
            </Route>
            <Route path="/bikes" element={<BikePage />}></Route>

            <Route path="/bike/:bikeId" element={<DetailBike />}></Route>
            <Route path="/unauthorized" element={<Unauthorized />}></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    );
}

export default AppRoute;
