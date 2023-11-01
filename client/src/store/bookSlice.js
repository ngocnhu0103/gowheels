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

    },
})


export const { selectedBook } = bookSlice.actions

export default bookSlice.reducer;