import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import bikeSlice from './bikeSlice'
import authSlice from './authSlice'


export const store = configureStore({
    reducer: { 'user': userSlice, 'bike': bikeSlice, 'auth': authSlice },
})