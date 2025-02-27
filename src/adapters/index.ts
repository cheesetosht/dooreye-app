import {getToken} from '@/utils/auth';
import axios, {AxiosResponse} from 'axios';
import Config from 'react-native-config';

export const dooreyeAxios = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
});

dooreyeAxios.defaults.baseURL = Config.API_BASE_URL;

dooreyeAxios.interceptors.request.use(
  async config => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    throw error;
  },
);

// Extracts data key from the Response
const getResponseBody = (response: AxiosResponse) => response.data;

// This object should be used for all REST calls to OUR Backend
export const fetcher = {
  get: <T>(url: string, params?: {}): Promise<T> =>
    dooreyeAxios.get<T>(url, {params}).then(getResponseBody),
  post: <T>(url: string, body: {}): Promise<T> =>
    dooreyeAxios.post<T>(url, body).then(getResponseBody),
  put: <T>(url: string, body: {}): Promise<T> =>
    dooreyeAxios.put<T>(url, body).then(getResponseBody),
  delete: <T>(url: string, body: {}): Promise<T> =>
    dooreyeAxios.delete<T>(url, {data: body}).then(getResponseBody),
};
