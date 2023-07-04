import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8082',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getClient = (url: string) => {
  http.defaults.baseURL = url;
  return http;
}

export default http;
