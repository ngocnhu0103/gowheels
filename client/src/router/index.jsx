import {
    createBrowserRouter,
} from "react-router-dom";

import Home from '../pages/HomePage'
import Profile from '../pages/ProfilePage';
import About from "../pages/AboutPage";
import Bike from "../pages/BikePage";

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
        path: "/about",
        element: <About />,
    },
    {
        path: "/bikes",
        element: <Bike />,
    },
]);

export default router