import React from 'react'
import HomeLayout from '../components/Layouts/HomeLayout'
import getLocation from '../helpers/location';
import { setLocation } from '../app/locationSlice'
import { useDispatch, useSelector } from 'react-redux';

export default function PlacesPage() {
    const location = useSelector(state => state.location);
    const dispatch = useDispatch();

    if(!location.hasLocation){
        getLocation().then(coordinates=>{
            dispatch(setLocation(coordinates));
        })
    }

    return (
        <HomeLayout>
            
        </HomeLayout>
    )
}
