import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../store/toastSlice";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Toast() {
    const { show, type, message } = useSelector((state) => state.toast);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(hideToast());
    };

    return show ? (
        <Snackbar
            open={show}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{
                horizontal: "right",
                vertical: "top",
            }}
        >
            <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    ) : null;
}

export default Toast;
