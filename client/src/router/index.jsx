import {
    createBrowserRouter,
} from "react-router-dom";

import Home from '../pages/HomePage'
import Profile from '../pages/ProfilePage';
import About from "../pages/AboutPage";
import Bike from "../pages/BikePage";
import UpdateProfile from "../pages/UpdateProfile";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        index: true
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/profile/update",
        element: <UpdateProfile />,
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