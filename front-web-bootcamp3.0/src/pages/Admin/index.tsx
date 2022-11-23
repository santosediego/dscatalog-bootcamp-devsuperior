import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Users from './Users';
import PrivateRoute from 'components/PrivateRoute';
import Products from './Products';
import './styles.css';

const Admin = () => {
    return (
        <div className="admin-container">
            <Navbar />
            <div className="admin-content">
                <Switch>
                    <PrivateRoute path='/admin/products'>
                        <Products />
                    </PrivateRoute>
                    <PrivateRoute path='/admin/categories'>
                        <p>CRUD de categorias - em desenvolvimento.</p>
                    </PrivateRoute>
                    <PrivateRoute path='/admin/users' roles={['ROLE_ADMIN']}>
                        <Users />
                    </PrivateRoute>
                    <Redirect from='*' to='/admin/products' exact />
                </Switch>
            </div>
        </div>
    );
}

export default Admin;
