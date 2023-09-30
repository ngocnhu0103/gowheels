import axios from 'axios';
import jwt_decode from "jwt-decode";
import { store } from '../store/store'
import { clearDataUser } from '../store/authSlice';
const baseAPI = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        'Content-Type': 'application/json',


    },
    withCredentials: false,

})

baseAPI.interceptors.request.use((config) => {
    if (["/auth/login", "/auth/register"].includes(config.url)) {
        return config;
    }

    const token = store.getState().auth.token;
    if (!token) {
        return config;
    }
    var { exp } = jwt_decode(token);

    if (Date.now() >= exp * 1000) {
        store.dispatch(clearDataUser())
        return config;
    }

    config.headers = { 'Authorization': `Bearer ${token}` }
    return config;

})

// Add a response interceptor
baseAPI.interceptors.response.use(function (response) {
    // Do something with response data
    if (response && response.data) {
        return response.data;
    }
    return response
}, function (error) {
    // Do something with response error
    throw error.response.data;
});

export default baseAPI