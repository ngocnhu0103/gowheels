import { createSlice } from "@reduxjs/toolkit";

const bikeSlice = createSlice({
    name: 'bike',
    initialState: {
        bike: {},
    },
    reducers: {
        saveDateBike: (state, actions) => {
            state.bike = actions.payload;
        },

    },
})

export const { saveDateBike } = bikeSlice.actions
export default bikeSlice.reducer;