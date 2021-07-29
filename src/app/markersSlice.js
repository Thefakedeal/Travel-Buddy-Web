import { createSlice } from '@reduxjs/toolkit'

const markers = createSlice({
    name: 'markers',
    initialState: [],
    reducers: {
        setMarkers(state, action){
            state = action.payload;
        }
    }
})

export const {setMarkers} = markers.actions;
export default markers.reducer;