import { createSlice } from "@reduxjs/toolkit";


const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: []
    },
    reducers: {
        saveCategories: (state, actions) => {
            state.categories = actions.payload;
        }
    }
})

export const { saveCategories } = categorySlice.actions;
export default categorySlice.reducer;