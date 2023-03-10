import axios from "axios";

const api = axios.create({
    // baseURL: 'http://localhost:3333'
    baseURL: "https://pizzaclub-c5ln.onrender.com",
});

export { api };
