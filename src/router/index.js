import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import HomePage from '../pages/HomePage'

export default function index() {
    return (
        <BrowserRouter>
        
        <Switch>

            <Route path='/'>
                <HomePage />
            </Route>

        </Switch>
        
        </BrowserRouter>
    )
}
