import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles.css';

import { ReactComponent as AuthImage } from 'assets/images/auth-image.svg';

const Auth = () => {
    return (
        <div className="auth-container">
            <div className="auth-banner-container">
                <h1>Divulgue seus produtos no DS Catalog</h1>
                <p>Faça parte do nosso catálogo de divulgação e aumente a venda dos seus produtos.</p>
                <AuthImage />
            </div>
            <div className="auth-form-container">
                <Switch>
                    <Route path={'/admin/auth/login'}>
                        <p>Login - em desenvolvimento.</p>
                    </Route>
                    <Route path={'/admin/auth/signup'}>
                        <p>Signup - em desenvolvimento.</p>
                    </Route>
                    <Route path={'/admin/auth/recover'}>
                        <p>Recover - em desenvolvimento.</p>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Auth;