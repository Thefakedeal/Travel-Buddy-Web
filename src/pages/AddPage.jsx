import React from 'react'
import HomeLayout from '../components/Layouts/HomeLayout'
import AddMap from '../components/AddMap'
import PlaceForm from '../components/forms/PlaceForm'
export default function AddPage() {
    return (
        <HomeLayout>
          <AddMap /> 
          <div className="p-4 my-4 mx-auto " style={{ minWidth:"200px", width:"80%", maxWidth: "600px" }}>
            <PlaceForm />  
          </div>
        </HomeLayout>
    )
}
