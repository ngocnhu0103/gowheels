import baseAPI from './baseAPI'
import { showToast } from "../store/toastSlice";

export const getAllBikeAPI = async (dispatch, params) => {
    console.log(params);
    try {
        var response = await baseAPI.get("/bike/all", { params })
        console.log(response);
    } catch (error) {
        console.log(error);
        dispatch(showToast({ message: error.message, type: "error" }))
    }
}

