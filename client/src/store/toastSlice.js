import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        type: "",
        message: "",
        show: false,
    },
    reducers: {
        showToast: (state, actions) => {
            state.type = actions.payload.type;
            state.message = actions.payload.message;
            state.show = true;
        },
        hideToast: (state) => {
            state.type = "error";
            state.message = "";
            state.show = false;
        }
    },
})

export const { showToast, hideToast } = toastSlice.actions
export default toastSlice.reducer;