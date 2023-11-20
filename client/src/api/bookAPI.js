import baseAPI from "./baseAPI";
import { showToast } from "../store/toastSlice";
import { addNewBook, saveBooksMyBike, saveMyBooks, updateBook } from "../store/authSlice";
import { selectedBook, updateBookDetail } from "../store/bookSlice";
// Slice
export const bookingAPI = async (dispatch, book) => {
    try {
        const response = await baseAPI.post('/book', book);
        console.log(response.data);
        if (response.statusCode === 200) {
            dispatch(addNewBook(response.data));
            dispatch(showToast({ message: response.message, type: 'success' }))

        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: 'error' }))
    }
}
// @get my books
export const getMyBooksAPI = async (dispatch, params) => {
    try {
        const response = await baseAPI.get('/book/renter', { params });
        if (response.statusCode === 200) {
            dispatch(saveMyBooks(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: 'error' }))
    }
}
// @get books my bike
export const getBooksMyBikeAPI = async (dispatch, params) => {
    console.log(params);
    try {
        const response = await baseAPI.get('/book/owner-bike', { params });
        if (response.statusCode === 200) {
            dispatch(saveBooksMyBike(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: 'error' }))
    }
}
// @update book
export const updateStatusBookAPI = async (dispatch, bookId, payload) => {
    try {
        const response = await baseAPI.post(`/book/update-status/${bookId}`, payload);
        if (response.statusCode === 200) {
            dispatch(updateBook(response.data));
            if (payload.newStatus === "Đã xác nhận") {
                dispatch(updateBookDetail(response.data));
            }

        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: 'error' }))
    }
}
// @payment book
export const paymentAPI = async (dispatch, bookId) => {
    try {
        const response = await baseAPI.post(`/book/payment/${bookId}`);
        if (response.statusCode === 200) {
            return response.data
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
// @payment-deposit
export const paymentDepositAPI = async (dispatch, bookId) => {
    try {
        const response = await baseAPI.post(`/book/payment-deposit/${bookId}`);
        if (response.statusCode === 200) {

            return response.data
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const afterPaymentDepositAPI = async (dispatch, bookId, params) => {
    try {
        const response = await baseAPI.get(`/book/payment/check/${bookId}`, { params });
        if (response.statusCode === 200) {
            dispatch(updateBook(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
export const afterPaymentAPI = async (dispatch, bookId, params) => {
    try {
        const response = await baseAPI.get(`/book/payment/check-end/${bookId}`, { params });
        console.log(response);
        if (response.statusCode === 200) {
            dispatch(updateBook(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
// @add surchages
export const addSurchargeAPI = async (dispatch, bookId, payload) => {
    console.log(payload);
    try {
        const response = await baseAPI.put(`/book/add-surchages/${bookId}`, payload);
        console.log(response);
        if (response.statusCode === 200) {
            dispatch(updateBookDetail(response.data));
            dispatch(showToast({ message: response.message, type: "success" }));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
// @edit surchages
export const editSurchargeAPI = async (dispatch, bookId, payload) => {
    try {
        const response = await baseAPI.put(`/book/edit-surchages/${bookId}`, payload);
        console.log(response);
        if (response.statusCode === 200) {
            dispatch(updateBookDetail(response.data));
            dispatch(showToast({ message: response.message, type: "success" }));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
// @book detail
export const getBookDetailAPI = async (dispatch, bookId) => {
    try {
        const response = await baseAPI.get(`/book/${bookId}`);
        if (response.statusCode === 200) {
            dispatch(selectedBook(response.data));
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};
// @get surchages
export const getSurchagesAPI = async (dispatch) => {
    try {
        const response = await baseAPI.get(`/surchage`);
        console.log(response.data);
        if (response.statusCode === 200) {
            return response.data
        }
    } catch (error) {
        dispatch(showToast({ message: error.message, type: "error" }));
    }
};