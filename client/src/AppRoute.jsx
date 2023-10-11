import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import UpdateProfile from "./pages/UpdateProfile";
import BikeFavs from "./pages/BikeFavs";
import MyStranport from "./pages/MyStranport";
import MyOrder from "./pages/MyOrder";
import Order from "./pages/Order";
import Rate from "./pages/Rate";
import RequiredAuth from "./router/RequiredAuth";
import BikeRegister from "./pages/BikeRegister";
import DetailBike from "./pages/DetailBike";
import NotFound from "./pages/NotFound";
import BikePage from "./pages/BikePage";
function AppRoute() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<RequiredAuth />}>
                <Route index path="/profile/update" element={<UpdateProfile />}></Route>
                <Route path="/profile/favs" element={<BikeFavs />}></Route>
                <Route path="/profile/mystranport" element={<MyStranport />}></Route>
                <Route path="/profile/order" element={<Order />}></Route>
                <Route path="/profile/myorder" element={<MyOrder />}></Route>
                <Route path="/profile/rate" element={<Rate />}></Route>
                <Route path="/bikeregister" element={<BikeRegister />}></Route>
            </Route>
            <Route path="/bikes" element={<BikePage />}></Route>
            <Route path="/bike/:bikeId" element={<DetailBike />}></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    );
}

export default AppRoute;
