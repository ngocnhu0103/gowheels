import baseAPI from "./baseAPI";
import { showToast } from "../store/toastSlice";
import { saveCategories } from "../store/categorySlice";
export const getCategoriesAPI = async (dispatch) => {
    try {
        const response = await baseAPI.get('/category/all');
        if (response.statusCode === 200) {
            dispatch(saveCategories(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: 'error' }))
    }
}