import axios from 'axios';
import { api } from '../config/urlConfig';

const axiosIntance = axios.create({
  baseURL: api,
});

export default axiosIntance;
