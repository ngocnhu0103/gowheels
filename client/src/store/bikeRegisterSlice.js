import { createSlice } from "@reduxjs/toolkit";

const bikeRegisterSlice = createSlice({
    name: 'bikeRegister',
    initialState: {
        bikeName: "",
        bikeCode: "",
        categoryId: null,
        description: "",
        color: "",
        tagList: [],
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
            state.categoryId = actions.payload.categoryId;
            state.description = actions.payload.description;
            state.color = actions.payload.color;
            state.tagList = actions.payload.tagList;
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
        clearData: (state) => {
            state.bikeName = null
            state.bikeCode = null
            state.categoryId = null
            state.description = null
            state.color = null
            state.tagList = []
            state.price = null
            state.place = null
            state.weekDiscount = null
            state.monthDiscount = null
            state.images = []

        }
    },
})

export const { saveInfoBike, saveImagesBike, saveInfoRental, clearData } = bikeRegisterSlice.actions
export default bikeRegisterSlice.reducer;