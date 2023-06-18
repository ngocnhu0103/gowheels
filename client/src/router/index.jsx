import {
    createBrowserRouter,
} from "react-router-dom";

import Home from '../pages/HomePage'
import Profile from '../pages/ProfilePage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
]);

export default router