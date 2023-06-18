import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: null,
        token: null
    },
    reducers: {
        saveDataUser: (state, actions) => {
            state.value = actions.payload;
        }
    },
})

export const { saveDataUser } = userSlice.actions
export default userSlice.reducer;