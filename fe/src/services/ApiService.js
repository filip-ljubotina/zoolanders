import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
});

const addTokenToHeaders = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const ApiService = {
    get: async (url) => {
        addTokenToHeaders()
        return await api.get(url);
    },

    post: async (url, data) => {
        addTokenToHeaders()
        return await api.post(url, data);
    },

    put: async (url, data) => {
        addTokenToHeaders();
        return await api.put(url, data);
    },

    delete: async (url) => {
        addTokenToHeaders();
        return await api.delete(url);
    },
};

export default ApiService;