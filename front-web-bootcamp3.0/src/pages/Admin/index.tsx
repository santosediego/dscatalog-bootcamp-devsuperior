import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import './styles.css';

const Admin = () => {
    return (
        <div className="admin-container">
            <Navbar />
            <div className="admin-content">
                <Switch>
                    <Route path='/admin/products'>
                        <p>CRUD de produtos - em desenvolvimento.</p>
                    </Route>
                    <Route path='/admin/categories'>
                        <p>CRUD de categorias - em desenvolvimento.</p>
                    </Route>
                    <Route path='/admin/users'>
                        <p>CRUD de usuários - em desenvolvimento.</p>
                    </Route>
                    <Redirect from='*' to='/admin/products' exact />
                </Switch>
            </div>
        </div>
    );
}

export default Admin;
