import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import bikeSlice from './bikeSlice'
import testSlice from './testSlice'


export const store = configureStore({
    reducer: { 'user': userSlice, 'bike': bikeSlice, 'test': testSlice },
})