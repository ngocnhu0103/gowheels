import baseAPI from "./baseAPI";
import { showToast } from "../store/toastSlice";
import { leaveComment, saveComments } from "../store/commentSlice";
export const getCommentsAPI = async (dispatch, userId) => {
    try {
        const response = await baseAPI.get(`/review/${userId}`);
        console.log(response);
        if (response.statusCode === 200) {
            dispatch(saveComments(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const postCommentAPI = async (dispatch, payload) => {
    console.log(payload);
    try {
        const response = await baseAPI.post(`/review`, payload);
        if (response.statusCode === 200) {
            dispatch(showToast({ message: response.message, type: "success" }));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const deleteCommentAPI = async (dispatch, commentId) => {
    try {
        const response = await baseAPI.delete(`/review/${commentId}`);
        if (response.statusCode === 200) {
            dispatch(leaveComment({ commentId }));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};