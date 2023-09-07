import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        user: null
    },
    reducers: {
        saveData: (state, actions) => {
            state.token = actions.payload.data.token;
            state.user = actions.payload.data.user;

        }
    }

})
export const { saveData } = authSlice.actions;
export default authSlice.reducer;