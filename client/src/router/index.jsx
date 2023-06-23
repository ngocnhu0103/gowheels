import {
    createBrowserRouter,
} from "react-router-dom";

import Home from '../pages/HomePage'
import Profile from '../pages/ProfilePage';
import About from "../pages/AboutPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/about",
        element: <About />,
    },
]);

export default router