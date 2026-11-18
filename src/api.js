import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8088/api',})
  api.interceptors.response.use(
    (res) => res,
    (err) => {
        alert(err.response?.data?.message || 'Error de conexión');
        return Promise.reject(err);
    }
  )
export default api;