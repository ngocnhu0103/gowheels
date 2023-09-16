import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/HomePage";
import Profile from "../pages/ProfilePage";
import About from "../pages/AboutPage";
import Bike from "../pages/BikePage";
import UpdateProfile from "../pages/UpdateProfile";
import NotFound from "../pages/NotFound";
import BikeFavs from "../pages/BikeFavs";
import Order from "../pages/Order";
import MyStranport from "../pages/MyStranport";
import MyOrder from "../pages/MyOrder";
import DeleteAccount from "../pages/DeleteAccount";
import Rate from "../pages/Rate";
import Dashboard from "../pages/dashboard/Dashboard";
import UserManagement from "../pages/dashboard/UserManagement";
import BikeRegister from "../pages/BikeRegister";
import DetailBike from "../pages/DetailBike";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        index: true,
    },
    {
        path: "/profile",
        element: <Profile />,
        children: [
            {
                path: "update",
                element: <UpdateProfile />,
            },
            {
                path: "favs",
                element: <BikeFavs />,
            },
            {
                path: "order",
                element: <Order />,
            },
            {
                path: "mystranport",
                element: <MyStranport />,
            },
            {
                path: "myorder",
                element: <MyOrder />,
            },
            {
                path: "deleteaccount",
                element: <DeleteAccount />,
            },
            {
                path: "rate",
                element: <Rate />,
            },
        ],
    },

    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/bikes",
        element: <Bike />,
    },
    {
        path: "/bike/:id",
        element: <DetailBike />,
    },
    {
        path: "/bikeregister",
        element: <BikeRegister />,
    },
    {
        path: "/admin",
        element: <Dashboard />,
        children: [
            {
                path: "user",
                element: <UserManagement />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
