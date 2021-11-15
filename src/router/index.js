import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import AddPage from '../pages/AddPage.jsx'
import HomePage from '../pages/HomePage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import PlacePage from '../pages/PlacePage.jsx'
import PlacesPage from '../pages/PlacesPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'

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

            <Route path='/places/create' exact>
                <AddPage />
            </Route>

            <Route path='/places/:id' exact>
                <PlacePage />
            </Route>

            <Route path='/login' exact>
                <LoginPage/>
            </Route>

            <Route path='/register' exact>
                <RegisterPage/>
            </Route>
        </Switch>
        
        </BrowserRouter>
    )
}
