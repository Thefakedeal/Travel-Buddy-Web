import { createSlice } from '@reduxjs/toolkit'

const location = createSlice({
    name:'location',
    initialState: {
        hasLocation: false,
        coordinates: [ ]
    },
    reducers: {
        setLocation(state, action){
            state.coordinates = action.payload
            state.hasLocation = true;
        }
    }
})

export const { setLocation } = location.actions;
export default location.reducer;