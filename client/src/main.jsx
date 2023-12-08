// import React from 'react'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import Toast from "./components/Toast";
import AppRoute from "./AppRoute";
const theme = createTheme({
    palette: {
        primary: {
            main: "#D9534F",
        },
        secondary: {
            main: "#E9B824",
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
                {/* <ParallaxProvider> */}
                <BrowserRouter>
                    <AppRoute />
                </BrowserRouter>
                {/* </ParallaxProvider> */}
            </ThemeProvider>
            <Toast />
        </PersistGate>
    </Provider>
    // </React.StrictMode>,
);
