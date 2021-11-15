import { createSlice } from '@reduxjs/toolkit'

const marker = createSlice({
    name:'clickedMarker',
    initialState: {
        lat: null,
        lon: null
    },
    reducers: {
        setMarker(state, action){
            state.lat = action.payload.lat
            state.lon = action.payload.lon  
        },
        setNull(state){
            state.lat = null;
            state.lon = null;
        }
    }
})

export const { setMarker, setNull} = marker.actions;
export default marker.reducer;