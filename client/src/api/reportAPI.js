import baseAPI from "./baseAPI";
import { showToast } from "../store/toastSlice";
export const getReportsByOwnerAPI = async (dispatch, ownerId) => {
    try {
        const response = await baseAPI.get(`/report/${ownerId}`);
        if (response.statusCode === 200) {
            // dispatch(saveCategories(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const getReportsAPI = async (dispatch) => {
    try {
        const response = await baseAPI.get(`/report/all`);
        if (response.statusCode === 200) {
            // dispatch(saveCategories(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const reportOwner = async (dispatch, ownerId, payload) => {
    try {
        const response = await baseAPI.post(`/report/${ownerId}`, payload);
        if (response.statusCode === 200) {
            // dispatch(saveCategories(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const evaluateReport = async (dispatch, reportId) => {
    try {
        const response = await baseAPI.put(`/report/${reportId}`);
        if (response.statusCode === 200) {
            // dispatch(saveCategories(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const deleteReport = async (dispatch, reportId) => {
    try {
        const response = await baseAPI.delete(`/report/${reportId}`);
        if (response.statusCode === 200) {
            // dispatch(saveCategories(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};