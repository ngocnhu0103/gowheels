import { createSlice } from "@reduxjs/toolkit";

const bikeSlice = createSlice({
    name: 'bike',
    initialState: {
        bike: {},
        bikeList: [],
    },
    reducers: {
        saveDataBike: (state, actions) => {
            state.bikeList = actions.payload;
        },
        saveNewBike: (state, actions) => {
            state.bikeList.push(actions.payload);
            state.bike = actions.payload;
        },
        setBike: (state, actions) => {
            state.bike = actions.payload;
        },
    },
})


export const { saveDataBike, saveNewBike, setBike } = bikeSlice.actions

export default bikeSlice.reducer;