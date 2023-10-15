import baseAPI from "./baseAPI";
import { showToast } from "../store/toastSlice";
export const getCommentsAPI = async (dispatch, bookId) => {
    try {
        const response = await baseAPI.get(`/comment/${bookId}`);
        if (response.statusCode === 200) {
            // dispatch(saveCategories(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const postComment = async (dispatch, payload) => {
    try {
        const response = await baseAPI.post(`/comment/`, payload);
        if (response.statusCode === 200) {
            // dispatch(saveCategories(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const deleteComment = async (dispatch, commentId) => {
    try {
        const response = await baseAPI.delete(`/comment/${commentId}`);
        if (response.statusCode === 200) {
            // dispatch(saveCategories(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};