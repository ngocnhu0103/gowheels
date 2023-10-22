import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        user: null,
        myBooks: [],
        bookMyBike: []
    },
    reducers: {
        saveData: (state, actions) => {
            state.token = actions.payload.token;
            state.user = actions.payload.user;

        },
        clearDataUser: (state) => {
            state.token = null;
            state.user = null;
            state.myBooks = null;
            state.bookMyBike = null;
        },
        addNewBook: (state, actions) => {
            console.log(actions.payload);
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
        },
        updateUser: (state, actions) => {
            state.user = actions.payload;
        },

    }

})
export const { saveData, clearDataUser, addNewBook, saveMyBooks, saveBooksMyBike, updateBook, updateUser } = authSlice.actions;
export default authSlice.reducer;