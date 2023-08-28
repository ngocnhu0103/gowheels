import {
    createBrowserRouter,
} from "react-router-dom";

import Home from '../pages/HomePage'
import Profile from '../pages/ProfilePage';
import About from "../pages/AboutPage";
import Bike from "../pages/BikePage";
import UpdateProfile from "../pages/UpdateProfile";
import NotFound from "../pages/NotFound";
import BikeFavs from "../pages/BikeFavs";
import Order from "../pages/Order";
import Mystranport from "../pages/MyStranport";
import MyStranport from "../pages/MyStranport";
import MyOrder from "../pages/MyOrder";
import DeleteAccount from "../pages/DeleteAccount";
import Rate from "../pages/Rate";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        index: true
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
                element: <Rate />
            }
        ]
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
        path: "*",
        element: <NotFound />,
    },
]);

export default router