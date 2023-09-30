import baseAPI from "./baseAPI";
import { showToast } from "../store/toastSlice";
import { saveTags } from "../store/tagSlice";
export const getTagsAPI = async (dispatch) => {
    try {
        const response = await baseAPI.get('/tag/all');
        if (response.statusCode === 200) {
            dispatch(saveTags(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: 'error' }))
    }
}