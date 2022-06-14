import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { CLIENT_ID, CLIENT_SECRET, getSessionData, logout } from './auth';

type LoginData = {
    username: string;
    password: string;
}

// A url basica das requisições;
// Por padrão o method é GET, caso for outra coisa deve ser alterado na chamada;
// process.env identifica o estado em que o sistema esta, em produção ou local e selecia a variavel afim;
const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        logout();
    }
    return Promise.reject(error);
});

export const makeRequest = (params: AxiosRequestConfig) => {
    return axios({
        ...params,
        baseURL: BASE_URL
    });
}

export const makePrivateRequest = (params: AxiosRequestConfig) => {
    const sessionData = getSessionData();

    const headers = {
        'Authorization': `Bearer ${sessionData.access_token}`
    }

    return makeRequest({ ...params, headers })
}

export const makeLogin = (loginData: LoginData) => {
    const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

    const headers = {
        Authorization: `Basic ${window.btoa(token)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    const payload = qs.stringify({ ...loginData, grant_type: 'password' });

    //Como fazer o payload na mão:
    //const payload = `username=${loginData.username}&password=${loginData.password}&grant_type=password`

    return makeRequest({ url: '/oauth/token', data: payload, method: 'POST', headers });
}