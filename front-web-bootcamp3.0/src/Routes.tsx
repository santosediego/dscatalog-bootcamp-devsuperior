import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Catalog from 'pages/Catalog';
import Home from 'pages/Home';
import Admin from 'pages/Admin';
import ProductDetails from 'pages/ProductDetails';
import Auth from 'pages/Auth';
import history from 'util/history';

const Routes = () => {
    return (
        <Router history={history}>
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
                <Redirect from='/admin/auth' to='/admin/auth/login' exact />
                <Route path='/admin/auth'>
                    <Auth />
                </Route>
                <Redirect from='/admin' to='/admin/products' exact />
                <Route path='/admin'>
                    <Admin />
                </Route>
                <Redirect from='*' to='/' exact />
            </Switch>
        </Router>
    );
}

export default Routes;
