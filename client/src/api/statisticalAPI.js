import baseAPI from "./baseAPI";
export const getBikesForStatisticalAPI = async () => {
    try {
        const response = await baseAPI.get('/statistical');
        if (response.statusCode === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}
export const getBooksForStatisticalAPI = async () => {
    try {
        const response = await baseAPI.get('/statistical/books');
        if (response.statusCode === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}