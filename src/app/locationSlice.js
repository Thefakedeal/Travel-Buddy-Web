import { createSlice } from '@reduxjs/toolkit'

const location = createSlice({
    name:'location',
    initialState: {
        hasLocation: false,
        coordinates: [ ]
    },
    reducers: {
        setLocation(state, action){
            state.hasLocation = true;
            state.coordinates = action.payload
        }
    }
})

export const { setLocation } = location.actions;
export default location.reducer;