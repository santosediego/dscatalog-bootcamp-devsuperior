import { isAllowedByRole, isAuthenticated, Role } from 'core/utils/auth';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
    path: string;
    allowedRoutes?: Role[];
}

const PrivateRoute = ({ children, path, allowedRoutes }: Props ) => {
    return (
      <Route
        path={path}
        render={({ location }) => {
          if (!isAuthenticated()){// usuário não autênticado?;
            return(
              <Redirect // redireciona para login;
                to={{
                  pathname: "/auth/login",
                  state: { from: location }
                }}
              />
            )
          } else if (isAuthenticated() && !isAllowedByRole(allowedRoutes)){ // Se autêntica mas sem permissão;
            return(
              <Redirect to={{ pathname: "/admin" }}/>// Redireciona para o admin;
            )
          }

          return children;
        }}
      />
    );
  }

  export default PrivateRoute;