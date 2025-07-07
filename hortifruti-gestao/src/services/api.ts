import axios from 'axios';

// ATENÇÃO: Altere a baseURL para o endereço do seu back-end.
// Se seu NestJS roda na porta 3000, o endereço padrão está correto.
const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log para facilitar a depuração de erros da API no console do navegador
    console.error("Erro na chamada da API:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);


export default api;