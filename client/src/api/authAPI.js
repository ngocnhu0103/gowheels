import { saveData } from "../store/authSlice";
import { showToast } from "../store/toastSlice";
import baseAPI from "./baseAPI";

export const registerAPI = async (dispatch, values) => {
    console.log(values, 'auth api');
    try {
        const response = await baseAPI.post("/auth/register", values);
        console.log(response);
        if (response.statusCode === 200) {
            dispatch(saveData(response.data))
            dispatch(showToast({ message: response.message, type: "success" }))
        }

    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }))
    }
}

export const loginAPI = async (dispatch, values) => {
    try {
        const response = await baseAPI.post("/auth/login", values);
        if (response.statusCode === 200) {
            dispatch(saveData(response.data))
            dispatch(showToast({ message: response.message, type: "success" }))
        }

    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }))
    }
}