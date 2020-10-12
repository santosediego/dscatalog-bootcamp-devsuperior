import axios, { Method } from 'axios';

//Criamos um tipo para o method, os registros para a url;
type RequestParams = {
    method?: Method;
    url: string; // url vinda da chamda;
    data?: object; // Dados que serão enviados ao backend; (Cadastro, post, update);
    params?: object; // 
}

// A url basica das requisições;
const BASE_URL = 'http://localhost:3000';

export const makeRequest = ({ method = 'GET', url, data, params }: RequestParams) => {
    return axios ({
        method,
        url: `${BASE_URL}${url}`,
        data,
        params
    });
}
// Por padrão o method é GET, caso for outra coisa deve ser alterado na chamada;