import { saveData } from "../store/authSlice";
import { showToast } from "../store/toastSlice";
import baseAPI from "./baseAPI";

export const registerAPI = async (dispatch, values) => {
    console.log(values, 'auth api');
    try {
        const data = await baseAPI.post("/auth/register", values);
        console.log(data);
        dispatch(saveData(data))
        dispatch(showToast({ message: data.message, type: "success" }))
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }))
    }
}

export const loginAPI = async (dispatch, values) => {
    try {
        const data = await baseAPI.post("/auth/login", values);

        dispatch(saveData(data))
        dispatch(showToast({ message: data.message, type: "success" }))
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }))
    }
}