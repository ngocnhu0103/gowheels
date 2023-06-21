import axios from 'axios';

const baseAPI = axios.create({
    baseURL: "http://localhost:8080/api/v1",
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