import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './locationSlice'
import markersReducer from './markersSlice';

const store = configureStore({
    reducer: {
        location: locationReducer,
        markers: markersReducer
    },
})

export default store;