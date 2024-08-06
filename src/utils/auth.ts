import {
  getGenericPassword,
  resetGenericPassword,
  setGenericPassword,
} from 'react-native-keychain';

export const getToken = () =>
  getGenericPassword()
    .then(credentials => {
      if (credentials) return credentials.password;
      return null;
    })
    .catch(err => {
      console.debug('error retreiving auth token:\n> ', err);
      return null;
    });

export const setToken = (token: string) =>
  setGenericPassword('authToken', token);

export const clearToken = () => resetGenericPassword();
