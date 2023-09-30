import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
// Slice
import userSlice from './userSlice'
import bikeSlice from './bikeSlice'
import authSlice from './authSlice'
import toastSlice from './toastSlice'
import bikeRegisterSlice from './bikeRegisterSlice';
import tagSlice from './tagSlice';
import categorySlice from './categorySlice';

const persistConfig = {
    key: 'root',
    whitelist: ['auth'],
    storage, // cookies, sesseion
}

const rootReducer = combineReducers({
    'user': userSlice,
    'tag': tagSlice,
    'category': categorySlice,
    'bike': bikeSlice,
    'auth': authSlice,
    'toast': toastSlice,
    'bikeRegister': bikeRegisterSlice
})

const persistedReducer = persistReducer(
    persistConfig, rootReducer
)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)