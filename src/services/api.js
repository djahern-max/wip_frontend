// ===== frontend/src/services/api.js =====
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

// Authentication
export const loginUser = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

// Users
export const getUsers = async () => {
    const response = await api.get('/users/');
    return response.data;
};

export const createUser = async (userData) => {
    const response = await api.post('/users/', userData);
    return response.data;
};

export const getUser = async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

// Admin
export const createFirstUser = async (userData) => {
    const response = await api.post('/admin/create-first-user', userData);
    return response.data;
};

export const healthCheck = async () => {
    const response = await api.get('/health');
    return response.data;
};

export default api;
// WIP API functions
export const getWIPItems = async () => {
    const response = await api.get('/wip/');
    return response.data;
};

export const createWIPItem = async (wipData) => {
    const response = await api.post('/wip/', wipData);
    return response.data;
};

export const getWIPItem = async (wipId) => {
    const response = await api.get(`/wip/${wipId}`);
    return response.data;
};

export const updateWIPItem = async (wipId, wipData) => {
    const response = await api.put(`/wip/${wipId}`, wipData);
    return response.data;
};

export const deleteWIPItem = async (wipId) => {
    const response = await api.delete(`/wip/${wipId}`);
    return response.data;
};



export const uploadWIPCSV = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/wip/upload-csv', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const downloadCSVTemplate = async () => {
    const response = await api.get('/wip/template', {
        responseType: 'blob',
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wip_template.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};