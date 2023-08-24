import axios from 'axios';
import { store } from '../store/store'
const baseAPI = axios.create({
    baseURL: "http://localhost:8080/api/v1",
})

baseAPI.interceptors.request.use((config) => {
    if (["/auth/login", "/auth/register"].includes(config.url)) {
        return config;
    }

    const token = store.getState().auth.token;
    if (!token) {
        return config;
    }
    return config.headers.Authorization = token;

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
    console.log(error);
    throw error.response.data;
});

export default baseAPI