import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
    name: 'test',
    initialState: {
        data: null
    },
    reducers: {
        saveTestData: (state, actions) => {
            state.data = actions.payload;
        }
    },
})

export const { saveTestData } = testSlice.actions
export default testSlice.reducer;