import axios from 'axios';
import Toast from 'react-native-toast-message';
import store from '../store';
import { setGlobalLoading } from '../store/slices/core.slice';
import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'app-storage',
  // Replace with a secure key in production with proper key management
  encryptionKey: 'my-encryption-key',
});

declare module 'axios' {
  export interface AxiosRequestConfig {
    showSuccessToast?: boolean;
    hasLoader?: boolean;
  }
}

export const APIClient = axios.create({
  timeout: 10000,
  timeoutErrorMessage: 'İstek zaman aşımına uğradı',
});

APIClient.interceptors.request.use(
  async function (config) {
    const hasLoader = config.hasLoader !== false;
    if (hasLoader) {
      store.dispatch(setGlobalLoading(true));
    }
    const token = storage.getString('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    Toast.show({
      type: 'error',
      text1: 'Hata',
      text2: error.message,
    });
    return Promise.reject(error);
  },
);

APIClient.interceptors.response.use(
  function (response) {
    const showSuccessToast = response.config.showSuccessToast !== false;
    if (showSuccessToast) {
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: response.data.message,
      });
    }
    const hasLoader = response.config.hasLoader !== false;
    if (hasLoader) {
      store.dispatch(setGlobalLoading(false));
    }
    return response;
  },
  function (error) {
    const isTimeout =
      error?.code === 'ECONNABORTED' || error?.code === 'ERR_NETWORK';
    Toast.show({
      type: 'error',
      text1: 'Hata',
      text2: isTimeout
        ? error.config.timeoutErrorMessage
        : error.response.data.message || 'Beklenmedik bir hata oluştu.',
    });
    store.dispatch(setGlobalLoading(false));
    return Promise.reject(error);
  },
);
