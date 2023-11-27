import baseAPI from './baseAPI'
import { showToast } from "../store/toastSlice";
import { saveDataBike, saveNewBike, setBike } from '../store/bikeSlice';
import { updateBikes, updateMyBike, updateUser } from '../store/authSlice';

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
        }

    } catch (error) {
        console.log(error);
        dispatch(showToast({ message: error.message, type: "error" }))
    }
}

export const searchBikesAPI = async (dispatch, params) => {
    try {
        const response = await baseAPI.get("/bike/search", { params: params });
        console.log(response);
        if (response.statusCode === 200) {
            dispatch(saveDataBike(response.data))
        }
    } catch (error) {
        console.log("Bike not found", error);
    }
};
export const likeBikeAPI = async (dispatch, bikeId) => {
    try {
        const response = await baseAPI.post(`/bike/like/${bikeId}`);
        console.log(response);
        if (response.statusCode === 200) {
            dispatch(updateUser(response.data))
            dispatch(showToast({ message: response.message, type: "success" }))

        }
    } catch (error) {
        console.log("Bike not found", error);
    }
};
export const unLikeBikeAPI = async (dispatch, bikeId) => {
    try {
        const response = await baseAPI.post(`/bike/dislike/${bikeId}`);
        console.log(response);

        if (response.statusCode === 200) {
            dispatch(updateUser(response.data))
        }
    } catch (error) {
        console.log("Bike not found", error);
    }
};
export const similarBikeAPI = async (params) => {
    try {
        const response = await baseAPI.get(`/bike/similar`, { params });
        if (response.statusCode === 200) {
            return response.data
        }
    } catch (error) {
        console.log("Bike not found", error);
    }
};
export const myStranportAPI = async (dispatch) => {
    try {
        const response = await baseAPI.get(`/bike/mystranport`);
        if (response.statusCode === 200) {
            dispatch(updateBikes(response.data))
        }
    } catch (error) {
        console.log("Bike not found", error);
    }
};
export const updateStatusBikeAPI = async (dispatch, bikeId, paylaod) => {
    try {
        const response = await baseAPI.post(`/bike/update-status/${bikeId}`, paylaod);
        if (response.statusCode === 200) {
            console.log(response.data);
            dispatch(updateMyBike(response.data))
        }
    } catch (error) {
        console.log("Bike not found", error);
    }
};

export const getBikesAPI = async (dispatch, userId) => {
    try {
        const response = await baseAPI.get(`/bike/getbikes/${userId}`);
        if (response.statusCode === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Bikes not found", error);
        dispatch(showToast({ message: error.message, type: "error" }))
    }
};
export const getTopPlaceAPI = async (dispatch) => {
    try {
        const response = await baseAPI.get(`/bike/top-place`);
        if (response.statusCode === 200) {
            return response.data;
        }
    } catch (error) {
        console.log("Bikes not found", error);
        dispatch(showToast({ message: error.message, type: "error" }))
    }
};

