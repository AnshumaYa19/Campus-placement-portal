import axios from "axios";

const api = axios.create({
    baseURL: "https://campus-placement-portal-t5ky.onrender.com/api",
    withCredentials: true
});

export default api;