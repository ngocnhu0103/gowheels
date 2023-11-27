import { createSlice } from "@reduxjs/toolkit";

const bikeSlice = createSlice({
    name: 'bike',
    initialState: {
        bike: {},
        bikeList: [],
        totals: null
    },
    reducers: {
        saveDataBike: (state, actions) => {
            state.bikeList = actions.payload.bikeList;
            state.totals = actions.payload.totals
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