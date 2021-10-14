import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.100.5:8080",
    //baseURL: "https://diegosantos-dscatalog.herokuapp.com",
});