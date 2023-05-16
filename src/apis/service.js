import axios from 'axios';

const baseService = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export default baseService;
