import baseAPI from './baseAPI'
import { showToast } from "../store/toastSlice";
import { saveDataBike, saveNewBike } from '../store/bikeSlice';

export const getAllBikeAPI = async (dispatch, params) => {
    console.log(params);
    try {
        var response = await baseAPI.get("/bike/all", { params })
        console.log(response);
        dispatch(saveDataBike(response.data))
    } catch (error) {
        console.log(error);
        dispatch(showToast({ message: error.message, type: "error" }))
    }
}

export const bikeRegisterAPI = async (dispatch, values) => {
    console.log(values);
    try {
        var response = await baseAPI.post("/bike", { values })
        console.log(response);

        dispatch(saveNewBike(response.data))
        dispatch(showToast({ message: response.data.message, type: "success" }))

    } catch (error) {
        console.log(error);
        dispatch(showToast({ message: error.message, type: "error" }))
    }
}
