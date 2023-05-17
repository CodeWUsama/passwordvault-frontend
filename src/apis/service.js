import axios from 'axios';
import { toast } from 'react-toastify';
import responseCodes from '../constants/responseCodes';

const baseService = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

baseService.interceptors.response.use(
  (response) => {
    if (response.data.response_code === responseCodes.serverError) {
      toast(response.data.message || 'Server error occured');
    } else if (response.data.response_code === responseCodes.authorizationError) {
      toast('You are not authorized to perform this action');
    }
    return Promise.resolve(response);
  },
  (error) => error
);

export default baseService;
