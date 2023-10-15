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

export const uploadAvatar = async (dispatch, payload) => {
    try {
        const response = await baseAPI.put("/user/update/avatar", payload);
        if (response.status === 200) {
            // dispatch()
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const registerOwner = async (dispatch, payload) => {
    try {
        const response = await baseAPI.put("/user/register/owner", payload);
        if (response.status === 200) {
            // dispatch()
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const updateInfo = async (dispatch, payload) => {
    try {
        const response = await baseAPI.put("/user/update/info", payload);
        if (response.status === 200) {
            // dispatch()
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};