import { saveToken } from "../store/authSlice";
import baseAPI from "./baseAPI";

export const registerAPI = async (dispatch, values) => {
    console.log(values, 'auth api');
    const data = await baseAPI.post("/auth/register", values);

    dispatch(saveToken(data))
    console.log(data);
}