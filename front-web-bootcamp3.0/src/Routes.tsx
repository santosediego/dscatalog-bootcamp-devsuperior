import React from 'react';
import Navbar from 'components/Navbar';
import Catalog from 'pages/Catalog';
import Home from 'pages/Home';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Admin from 'pages/Admin';

const Routes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path='/' exact>
                    <Home />
                </Route>
                <Route path='/products'>
                    <Catalog />
                </Route>
                <Route path='/admin'>
                    <Admin />
                </Route>
                <Redirect from='*' to='/' exact />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
