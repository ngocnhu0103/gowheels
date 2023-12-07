import { createSlice } from "@reduxjs/toolkit";

const bikeSlice = createSlice({
    name: 'bike',
    initialState: {
        bike: {},
        bikeList: [],
        totals: null
    },
    reducers: {
        saveDataBikeHome: (state, actions) => {
            state.bikeList = actions.payload
        },
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


export const { saveDataBike, saveNewBike, setBike, saveDataBikeHome } = bikeSlice.actions

export default bikeSlice.reducer;