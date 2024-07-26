import axios, {AxiosResponse} from 'axios';
import Config from 'react-native-config';

export const dooreyeAxios = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
});

dooreyeAxios.defaults.baseURL = Config.API_BASE_URL;

// Extracts data key from the Response
const getResponseBody = (response: AxiosResponse) => response.data;

// This object should be used for all REST calls to OUR Backend
export const fetcher = {
  get: (url: string, params?: {}) =>
    dooreyeAxios.get(url, {params}).then(getResponseBody),
  post: (url: string, body: {}) =>
    dooreyeAxios.post(url, body).then(getResponseBody),
  put: (url: string, body: {}) =>
    dooreyeAxios.put(url, body).then(getResponseBody),
  delete: (url: string, body: {}) =>
    dooreyeAxios.delete(url, {data: body}).then(getResponseBody),
};
