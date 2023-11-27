import axios from 'axios';

export const getCityByLatLongAPI = async (params = { lat: 48.858844300000001, lon: 2.2943506 }) => {
    // params lat and lon
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/reverse?format=json', { params })
        if (response) {
            console.log(response);
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}