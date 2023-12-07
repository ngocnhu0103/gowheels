import baseAPI from "./baseAPI";
import { showToast } from "../store/toastSlice";
import { detailReport, saveReports, updateReport, saveReportsForAdmin } from "../store/reportSlice";
export const getReportsByOwnerAPI = async (dispatch) => {
    try {
        const response = await baseAPI.get(`/report/author`);
        if (response.statusCode === 200) {
            dispatch(saveReports(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const getReportsAPI = async (dispatch, params = {}) => {
    try {
        const response = await baseAPI.get(`/report`, { params });
        if (response.statusCode === 200) {
            dispatch(saveReportsForAdmin(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const reportOwnerAPI = async (dispatch, payload) => {
    try {
        const response = await baseAPI.post(`/report`, payload);
        if (response.statusCode === 200) {
            dispatch(showToast({ message: response.message, type: "success" }));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const evaluateReportAPI = async (dispatch, reportId, payload) => {
    try {
        const response = await baseAPI.put(`/report/${reportId}`, payload);
        if (response.statusCode === 200) {
            dispatch(updateReport({ reportId, ...payload }))
            dispatch(showToast({ message: response.message, type: "success" }));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const detailReportAPI = async (dispatch, reportId) => {
    try {
        const response = await baseAPI.get(`/report/${reportId}`);
        if (response.statusCode === 200) {
            dispatch(detailReport(response.data))
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