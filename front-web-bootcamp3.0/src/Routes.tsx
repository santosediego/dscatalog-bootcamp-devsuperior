import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Catalog from 'pages/Catalog';
import Home from 'pages/Home';
import Admin from 'pages/Admin';
import ProductDetails from 'pages/ProductDetails';

const Routes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path='/' exact>
                    <Home />
                </Route>
                <Route path='/products' exact>
                    <Catalog />
                </Route>
                <Route path='/products/:productId' exact>
                    <ProductDetails />
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
