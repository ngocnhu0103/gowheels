import { saveToken } from "../store/authSlice";
import { showToast } from "../store/toastSlice";
import baseAPI from "./baseAPI";

export const registerAPI = async (dispatch, values) => {
    console.log(values, 'auth api');
    try {
        const data = await baseAPI.post("/auth/register", values);

        dispatch(saveToken(data))
        dispatch(showToast({ message: data.message, type: "success" }))
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }))
    }
}

export const loginAPI = async (dispatch, values) => {
    console.log(values);
    try {
        const data = await baseAPI.post("/auth/login", values);

        dispatch(saveToken(data))
        dispatch(showToast({ message: data.message, type: "success" }))
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }))
    }
}