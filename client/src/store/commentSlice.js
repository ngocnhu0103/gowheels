import { createSlice } from "@reduxjs/toolkit";


const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: []
    },
    reducers: {
        saveComments: (state, actions) => {
            state.comments = actions.payload;
        },
        leaveComment: (state, actions) => {
            state.comments = state.comments.filter((comm) => comm.id !== actions.payload.commentId)
        },
    }
})

export const { saveComments, leaveComment } = commentSlice.actions;
export default commentSlice.reducer;