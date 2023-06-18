import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import bikeSlice from './bikeSlice'


export const store = configureStore({
    reducer: { 'user': userSlice, 'bike': bikeSlice },
})