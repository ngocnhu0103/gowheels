import { baseAPI } from './baseAPI'
import { saveTestData } from '../store/testSlice';
export const testAPI = async (dispatch) => {
    try {
        const data = await baseAPI.get('/test');

        console.log(data);
        dispatch(saveTestData(data))
    } catch (error) {
        console.log(error);
    }
}