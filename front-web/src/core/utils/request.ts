import axios, { Method } from 'axios';
import qs from 'qs';
import { CLIENT_ID, CLIENT_SECRET} from './auth';

//Criamos um tipo para o method, os registros para a url;
type RequestParams = {
    method?: Method;
    url: string; // url vinda da chamda;
    data?: object | string; // Dados que serão enviados ao backend; (Cadastro, post, update); object ou string
    params?: object;
    headers?: object;
}

type LoginData = {
    username: string;
    password: string;
}

// A url basica das requisições;
// Por padrão o method é GET, caso for outra coisa deve ser alterado na chamada;
const BASE_URL = 'http://localhost:8080';

export const makeRequest = ({ method = 'GET', url, data, params, headers }: RequestParams) => {
    return axios ({
        method,
        url: `${BASE_URL}${url}`,
        data,
        params,
        headers
    });
}

export const makeLogin = (loginData: LoginData) => {
    const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

    const headers = {
        Authorization: `Basic ${window.btoa(token)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    const payload = qs.stringify({ ...loginData, grant_type: 'password'});

    //Como fazer o payload na mão:
    //const payload = `username=${loginData.username}&password=${loginData.password}&grant_type=password`

    return makeRequest({ url: '/oauth/token', data: payload, method: 'POST', headers });
}