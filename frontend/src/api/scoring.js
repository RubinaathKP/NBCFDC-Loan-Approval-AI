import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});
apiClient.interceptors.request.use(
    (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);
export const predictRisk = async (applicationData) => {
    try {
        console.log('Sending prediction request with payload:', applicationData);
        console.log('API URL:', `${API_BASE_URL}/predict`);
        const response = await apiClient.post('/predict', applicationData);
        console.log('Prediction successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Prediction failed!');
        console.error('Error object:', error);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received. Request details:', error.request);
            console.error('Is the backend running on port 8000?');
        } else {
            console.error('Request setup error:', error.message);
        }
        throw error;
    }
};
export const getOccupations = async () => {
    try {
        const response = await apiClient.get('/occupations');
        return response.data;
    } catch (error) {
        console.error('Error fetching occupations:', error);
        throw error;
    }
};
export const getRiskMatrix = async () => {
    try {
        const response = await apiClient.get('/risk-matrix');
        return response.data;
    } catch (error) {
        console.error('Error fetching risk matrix:', error);
        throw error;
    }
};
export const healthCheck = async () => {
    try {
        const response = await apiClient.get('/');
        return response.data;
    } catch (error) {
        console.error('Error checking API health:', error);
        throw error;
    }
};
export default apiClient;
export const getEnterpriseCategories = async () => {
    try {
        const response = await apiClient.get('/msme/enterprise-categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching enterprise categories:', error);
        throw error;
    }
};
export const getBusinessTypes = async () => {
    try {
        const response = await apiClient.get('/msme/business-types');
        return response.data;
    } catch (error) {
        console.error('Error fetching business types:', error);
        throw error;
    }
};
export const getIndustrySectors = async () => {
    try {
        const response = await apiClient.get('/msme/industries');
        return response.data;
    } catch (error) {
        console.error('Error fetching industry sectors:', error);
        throw error;
    }
};
export const getMSMERiskMatrix = async () => {
    try {
        const response = await apiClient.get('/msme/risk-matrix');
        return response.data;
    } catch (error) {
        console.error('Error fetching MSME risk matrix:', error);
        throw error;
    }
};
export const predictMSMERisk = async (data) => {
    try {
        console.log('🚀 Sending MSME prediction request:', data);
        const response = await apiClient.post('/msme/predict', data);
        console.log('✅ MSME Prediction successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ MSME Prediction failed!');
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        throw error;
    }
};
