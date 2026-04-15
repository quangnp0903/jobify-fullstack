import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const customFetch = axios.create({
  baseURL: `${API}/v1`,
  withCredentials: true,
});

export default customFetch;
