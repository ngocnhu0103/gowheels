import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: 'book',
    initialState: {
        book: {},
    },
    reducers: {
        selectedBook: (state, actions) => {
            state.book = actions.payload;
        },
        updateBookDetail: (state, actions) => {
            state.book = actions.payload;
        },

    },
})


export const { selectedBook, updateBookDetail } = bookSlice.actions

export default bookSlice.reducer;