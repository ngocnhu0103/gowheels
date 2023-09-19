import { createSlice } from "@reduxjs/toolkit";

const bikeRegisterSlice = createSlice({
    name: 'bikeRegister',
    initialState: {
        bikeName: "",
        bikeCode: "",
        category: null,
        description: "",
        color: "",
        tags: [],
        price: null,
        place: "",
        images: [],
        weekDiscount: 0,
        monthDiscount: 0

    },
    reducers: {
        saveInfoBike: (state, actions) => {
            state.bikeName = actions.payload.bikeName;
            state.bikeCode = actions.payload.bikeCode;
            state.category = actions.payload.category;
            state.description = actions.payload.description;
            state.color = actions.payload.color;
            state.tags = actions.payload.tags;
        },
        saveInfoRental: (state, actions) => {
            state.price = actions.payload.price;
            state.place = actions.payload.place;
            state.weekDiscount = actions.payload.weekDiscount;
            state.monthDiscount = actions.payload.monthDiscount;

        },
        saveImagesBike: (state, actions) => {
            state.images = actions.payload.images;
        },
    },
})

export const { saveInfoBike, saveImagesBike, saveInfoRental } = bikeRegisterSlice.actions
export default bikeRegisterSlice.reducer;