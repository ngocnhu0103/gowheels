import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null
    },
    reducers: {
        saveToken: (state, actions) => {
            state.token = actions.payload;
        }
    }

})
export const { saveToken } = authSlice.actions;
export default authSlice.reducer;