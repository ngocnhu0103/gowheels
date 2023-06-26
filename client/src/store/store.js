import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
// Slice
import userSlice from './userSlice'
import bikeSlice from './bikeSlice'
import authSlice from './authSlice'
import toastSlice from './toastSlice'

const persistConfig = {
    key: 'root',
    storage, // cookies, sesseion
}

const rootReducer = combineReducers({
    'user': userSlice,
    'bike': bikeSlice,
    'auth': authSlice,
    'toast': toastSlice,
})

const persistedReducer = persistReducer(
    persistConfig, rootReducer
)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)