import { createSlice } from "@reduxjs/toolkit";


const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: []
    },
    reducers: {
        saveComments: (state, actions) => {
            state.comments = actions.payload;
        }
    }
})

export const { saveComments } = commentSlice.actions;
export default commentSlice.reducer;