import axios from 'axios';

// Set up the base URL for Axios and withCredentials
const api = axios.create({
  baseURL:  'http://express-backend',
  withCredentials: true,
});

export default api;