import { createSlice } from "@reduxjs/toolkit";


const tagSlice = createSlice({
    name: 'tag',
    initialState: {
        tags: []
    },
    reducers: {
        saveTags: (state, actions) => {
            state.tags = actions.payload;
        }
    }
})

export const { saveTags } = tagSlice.actions;
export default tagSlice.reducer;