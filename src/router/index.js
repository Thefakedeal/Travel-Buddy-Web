import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
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
