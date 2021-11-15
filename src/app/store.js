import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './locationSlice'
import markersReducer from './markersSlice';
import clickedMarkerReducer from './clickedMarkerSlice';

const store = configureStore({
    reducer: {
        location: locationReducer,
        markers: markersReducer,
        clickedMarker: clickedMarkerReducer
    },
})

export default store;