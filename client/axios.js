import axios from 'axios';

// Set up the base URL for Axios and withCredentials
const api = axios.create({
  baseURL:  '/api',
  withCredentials: true,
});

export default api;

//baseURL:  'http://express-backend',