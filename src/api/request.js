// src/api/request.js
import axios from 'axios';
import { Modal } from 'antd';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 30000,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


instance.interceptors.response.use(
  (response) => {
    if ('code' in response.data) {
      if(response.data.code === 200 || response.data.code === 0) {
        return response.data;
      } else {
        const errorMessage = response.data.error || 'An error occurred';
        
        Modal.error({
          title: 'Error',
          content: errorMessage,
        });

        return Promise.reject(new Error(errorMessage));
      }
    } else {
      return response.data;
    }
  },
  (error) => {
    const errorMessage = error.message || 'An error occurred';
    
    Modal.error({
      title: 'Error',
      content: errorMessage,
    });

    return Promise.reject(error);
  }
);




export default instance;
