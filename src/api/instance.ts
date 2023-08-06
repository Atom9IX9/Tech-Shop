import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3030/",
});

export const $user = axios.create({
  baseURL: "http://localhost:5000/api/user"
})

export default instance;