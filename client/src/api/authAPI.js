import { saveData, updateUser } from "../store/authSlice";
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
        return response.statusCode;
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

export const verifyOtpAPI = async (dispatch, values) => {
    try {
        const response = await baseAPI.get("/auth/verify", { params: values });
        console.log(response);
        if (response.statusCode === 200) {
            dispatch(updateUser(response.data))
            dispatch(showToast({ message: response.message, type: "success" }))
        }
        return response.statusCode;
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }))
    }
}

export const reSendOtpAPI = async (dispatch) => {
    try {
        await baseAPI.get("/auth/resend");
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }))
    }
}

export const uploadAvatarAPI = async (dispatch, payload) => {
    try {
        const response = await baseAPI.post("/user/update/avatar", payload);
        if (response.statusCode === 200) {
            dispatch(updateUser(response.data))
            dispatch(showToast({ message: response.message, type: "success" }));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const registerOwnerAPI = async (dispatch, payload) => {
    try {
        const response = await baseAPI.post("/user/register/owner", payload);
        if (response.statusCode === 200) {
            dispatch(updateUser(response.data))
            dispatch(showToast({ message: response.message, type: "success" }));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const updateInfoAPI = async (dispatch, payload) => {
    try {
        const response = await baseAPI.put("/user/update/info", payload);
        if (response.statusCode === 200) {
            dispatch(updateUser(response.data))
            dispatch(showToast({ message: response.message, type: "success" }));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const getProfileAPI = async (dispatch, userId) => {
    try {
        const response = await baseAPI.get(`/user/getuser/${userId}`);
        if (response.statusCode === 200) {
            return response.data
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};