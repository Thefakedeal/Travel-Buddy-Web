import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'
import PlacesPage from '../pages/PlacesPage.jsx'

export default function index() {
    return (
        <BrowserRouter>
        
        <Switch>

            <Route path='/' exact>
                <HomePage />
            </Route>

            <Route path='/places' exact>
                <PlacesPage />
            </Route>

        </Switch>
        
        </BrowserRouter>
    )
}
