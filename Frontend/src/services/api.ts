import axios from "axios";

const api = axios.create({
  // Garanta que este IP é o do seu computador
  baseURL: "http://192.168.0.10:3000", 
});

export default api;