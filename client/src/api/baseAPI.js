import axios from 'axios';


export const baseAPI = axios.create({
    baseURL: "http://localhost:8080/api/v1",
})