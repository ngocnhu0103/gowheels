import baseAPI from './baseAPI'
import { showToast } from "../store/toastSlice";
import { saveDataBike, saveNewBike, setBike } from '../store/bikeSlice';

export const getAllBikeAPI = async (dispatch, params) => {
    try {
        var response = await baseAPI.get("/bike/all", { params })
        if (response.statusCode === 200) {
            dispatch(saveDataBike(response.data))
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }))
    }
}

export const bikeRegisterAPI = async (dispatch, values) => {
    try {
        var response = await baseAPI.post("/bike", values)
        if (response.statusCode === 200) {
            dispatch(saveNewBike(response.data))
            dispatch(showToast({ message: response.message, type: "success" }))
        }

    } catch (error) {
        console.log(error);
        dispatch(showToast({ message: error.message, type: "error" }))
    }
}
export const getBikeAPI = async (dispatch, id) => {
    try {
        var response = await baseAPI.get(`/bike/${id}`,)
        if (response.statusCode === 200) {
            dispatch(setBike(response.data))
            dispatch(showToast({ message: response.message, type: "success" }))
        }

    } catch (error) {
        console.log(error);
        dispatch(showToast({ message: error.message, type: "error" }))
    }
}
