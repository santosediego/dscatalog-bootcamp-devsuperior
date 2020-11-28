import jwtDecode from 'jwt-decode';
import history from './history';

export const CLIENT_ID = 'dscatalog';
export const CLIENT_SECRET = 'dscatalog123';

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    userFirstName: string;
    userId: number;
}

export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN'

type AccessToken = {
    exp: number;
    user_name: string;
    authorities:  Role[];
}

export const saveSessionData = (loginResponse: LoginResponse) => {
    localStorage.setItem('authData', JSON.stringify(loginResponse));
}

// Colhe os dados da seção;*
export const getSessionData = () => {
    const sessionData = localStorage.getItem('authData') || '{}';
    
    const parsedSessionData = JSON.parse(sessionData);

    return parsedSessionData as LoginResponse;
}

// Extrai o token da seção;*
export const getAccessTokenDecoded = () => {
    const sessionData = getSessionData();

    try {
        const tokenDecoded = jwtDecode(sessionData.access_token);
        return tokenDecoded as AccessToken;
    } catch (error){
        return {} as AccessToken;
    }
}

// Verifica se  chave não está expirada;
export const isTokenValid = () => {
    const { exp } = getAccessTokenDecoded();

    return Date.now() <= exp * 1000; // multiplicado por mil para converter para milisegundos;
}

// Solicita a verificação da existência do token e se ele esta expirado;
export const isAuthenticated = () => {
    const sessionData = getSessionData();

    return sessionData.access_token && isTokenValid();
}

// Checar se o usuário tem permissiões, Role , para acesso a rotas;
export const isAllowedByRole = (routeRoles: Role[] = []) => {
    if(routeRoles.length === 0){
        return true;
    }

    const { authorities } = getAccessTokenDecoded();

    // Existe ao menos uma role nesse usuário compativel com as do sistema?
    return routeRoles.some(role => authorities?.includes(role));
}

// Faz o logout
export const logout = () =>{
    localStorage.removeItem("authData"); // Limpa a chave, se usado .clear() limpa tudo;
    history.replace('/auth/login');
}