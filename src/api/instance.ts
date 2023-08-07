import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3030/",
});

export const $host = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_HOST,
});

export const $authHost = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_HOST,
});

$authHost.interceptors.request.use((config) => {
  if (config && config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("userToken")}`;
  }
  return config
});

export default instance;
