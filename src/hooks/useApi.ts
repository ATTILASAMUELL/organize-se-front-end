import  axios from 'axios';
import { User } from '../types/User';

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});


export const useApi  = () => ({
    validateToken: async (token: string|any) => {
        try {
            // Configurar o cabeçalho de autorização com o token
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Fazer a chamada para renovar o token (assumindo que /refresh é o endpoint correto)
            const response = await api.post('/refresh');

            // Retornar os dados da resposta
            return response.data;
        } catch (error) {
            console.log("errorrr")
            console.log(error)
            return error;
        }
    },
    signin: async (email:string,password: string) : Promise<any | boolean> => {
        try {
            const response = await api.post('/login', {email, password });
            
            return response.data; // Retorna os dados em caso de sucesso
        } catch (error) {
            return error;
        }
    },
    sendEmailValidation: async (token:string) => {
        const response  = await api.post('/resend');
        return response.data;
    },
    register: async (name: string,email:string,password: string) => {       
        const response = await api.post('/register', { name, email, password }).then((response) => {
            if(response.status == 200 || response.status == 201) {
                return true;
            }
            return false;
        }).catch((erro) => {
            return false;
        });
        return response
    },
    signout: async (token:string|any) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await api.post('/logout');
        return response.data;
    },
})