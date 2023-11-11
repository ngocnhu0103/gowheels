import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        user: null,
        myBooks: [],
        bookMyBike: [],
        myBikes: [],

    },
    reducers: {
        saveData: (state, actions) => {
            state.token = actions.payload.token;
            state.user = actions.payload.user;
        },
        clearDataUser: (state) => {
            state.token = null;
            state.user = null;
            state.myBooks = [];
            state.bookMyBike = [];
            state.myBikes = [];
        },
        addNewBook: (state, actions) => {
            state.myBooks = [...state.myBooks, actions.payload];
        },
        saveMyBooks: (state, actions) => {
            state.myBooks = actions.payload;
        },
        saveBooksMyBike: (state, actions) => {
            state.bookMyBike = actions.payload;
        },
        updateBook: (state, actions) => {
            state.bookMyBike.forEach((book) => {
                if (book.id === actions.payload.id) {
                    book.status = actions.payload.status;
                }
            })
            state.myBooks.forEach((book) => {
                if (book.id === actions.payload.id) {
                    book.status = actions.payload.status;
                }
            })
        },
        updateUser: (state, actions) => {
            state.user = actions.payload;
        },
        updateBikes: (state, actions) => {
            state.myBikes = actions.payload;
        },
        updateMyBike: (state, actions) => {
            state.myBikes = state.myBikes.map((bike) => {
                if (bike.bikeId === actions.payload.bikeId) {
                    return bike = actions.payload
                }
                return bike
            })

        },
    }

})
export const { saveData, clearDataUser, addNewBook, saveMyBooks, saveBooksMyBike, updateBook, updateUser, updateBikes, updateMyBike } = authSlice.actions;
export default authSlice.reducer;