import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        user: null
    },
    reducers: {
        saveData: (state, actions) => {
            state.token = actions.payload.token;
            state.user = actions.payload.user;

        },
        clearDataUser: (state) => {
            state.token = null;
            state.user = null;
        }
    }

})
export const { saveData, clearDataUser } = authSlice.actions;
export default authSlice.reducer;