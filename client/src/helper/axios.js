import axios from 'axios';
import { api } from '../config/urlConfig';

const axiosIntance = axios.create({
  baseURL: api,
});

// axiosIntance.defaults.headers("Access-Control-Allow-Origin", "*");
// axiosIntance.defaults.headers("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

export default axiosIntance;
